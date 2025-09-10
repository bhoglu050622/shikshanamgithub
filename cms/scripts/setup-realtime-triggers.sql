-- PostgreSQL triggers for real-time CMS notifications
-- Run this script to set up automatic real-time events

-- Create a function to notify CMS events
CREATE OR REPLACE FUNCTION notify_cms_event()
RETURNS TRIGGER AS $$
DECLARE
    event_type TEXT;
    entity_type TEXT;
    entity_id TEXT;
    event_data JSONB;
BEGIN
    -- Determine event type based on operation
    IF TG_OP = 'INSERT' THEN
        event_type := 'create';
    ELSIF TG_OP = 'UPDATE' THEN
        event_type := 'update';
    ELSIF TG_OP = 'DELETE' THEN
        event_type := 'delete';
    END IF;

    -- Determine entity type based on table
    entity_type := TG_TABLE_NAME;
    
    -- Get entity ID
    IF TG_OP = 'DELETE' THEN
        entity_id := OLD.id::TEXT;
        event_data := to_jsonb(OLD);
    ELSE
        entity_id := NEW.id::TEXT;
        event_data := to_jsonb(NEW);
    END IF;

    -- Send notification
    PERFORM pg_notify(
        'cms_event',
        json_build_object(
            'type', event_type,
            'entity', entity_type,
            'entityId', entity_id,
            'data', event_data,
            'timestamp', NOW(),
            'operation', TG_OP
        )::TEXT
    );

    -- Return appropriate record
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all CMS tables

-- Courses table
DROP TRIGGER IF EXISTS courses_cms_notify ON courses;
CREATE TRIGGER courses_cms_notify
    AFTER INSERT OR UPDATE OR DELETE ON courses
    FOR EACH ROW EXECUTE FUNCTION notify_cms_event();

-- Lessons table
DROP TRIGGER IF EXISTS lessons_cms_notify ON lessons;
CREATE TRIGGER lessons_cms_notify
    AFTER INSERT OR UPDATE OR DELETE ON lessons
    FOR EACH ROW EXECUTE FUNCTION notify_cms_event();

-- Blog posts table
DROP TRIGGER IF EXISTS blog_posts_cms_notify ON blog_posts;
CREATE TRIGGER blog_posts_cms_notify
    AFTER INSERT OR UPDATE OR DELETE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION notify_cms_event();

-- Packages table
DROP TRIGGER IF EXISTS packages_cms_notify ON packages;
CREATE TRIGGER packages_cms_notify
    AFTER INSERT OR UPDATE OR DELETE ON packages
    FOR EACH ROW EXECUTE FUNCTION notify_cms_event();

-- Pages table
DROP TRIGGER IF EXISTS pages_cms_notify ON pages;
CREATE TRIGGER pages_cms_notify
    AFTER INSERT OR UPDATE OR DELETE ON pages
    FOR EACH ROW EXECUTE FUNCTION notify_cms_event();

-- Media table
DROP TRIGGER IF EXISTS media_cms_notify ON media;
CREATE TRIGGER media_cms_notify
    AFTER INSERT OR UPDATE OR DELETE ON media
    FOR EACH ROW EXECUTE FUNCTION notify_cms_event();

-- Users table
DROP TRIGGER IF EXISTS users_cms_notify ON users;
CREATE TRIGGER users_cms_notify
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION notify_cms_event();

-- Revisions table
DROP TRIGGER IF EXISTS revisions_cms_notify ON revisions;
CREATE TRIGGER revisions_cms_notify
    AFTER INSERT OR UPDATE OR DELETE ON revisions
    FOR EACH ROW EXECUTE FUNCTION notify_cms_event();

-- Content sections table
DROP TRIGGER IF EXISTS content_sections_cms_notify ON content_sections;
CREATE TRIGGER content_sections_cms_notify
    AFTER INSERT OR UPDATE OR DELETE ON content_sections
    FOR EACH ROW EXECUTE FUNCTION notify_cms_event();

-- Special trigger for course status changes (publish/unpublish)
CREATE OR REPLACE FUNCTION notify_course_status_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Only notify if status actually changed
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        PERFORM pg_notify(
            'cms_event',
            json_build_object(
                'type', CASE 
                    WHEN NEW.status = 'PUBLISHED' THEN 'publish'
                    WHEN OLD.status = 'PUBLISHED' THEN 'unpublish'
                    ELSE 'status_change'
                END,
                'entity', 'course',
                'entityId', NEW.id::TEXT,
                'data', to_jsonb(NEW),
                'timestamp', NOW(),
                'operation', 'STATUS_CHANGE',
                'oldStatus', OLD.status,
                'newStatus', NEW.status
            )::TEXT
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS courses_status_change_notify ON courses;
CREATE TRIGGER courses_status_change_notify
    AFTER UPDATE OF status ON courses
    FOR EACH ROW EXECUTE FUNCTION notify_course_status_change();

-- Special trigger for blog post status changes
DROP TRIGGER IF EXISTS blog_posts_status_change_notify ON blog_posts;
CREATE TRIGGER blog_posts_status_change_notify
    AFTER UPDATE OF status ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION notify_course_status_change();

-- Special trigger for package status changes
DROP TRIGGER IF EXISTS packages_status_change_notify ON packages;
CREATE TRIGGER packages_status_change_notify
    AFTER UPDATE OF status ON packages
    FOR EACH ROW EXECUTE FUNCTION notify_course_status_change();

-- Create a function to test notifications
CREATE OR REPLACE FUNCTION test_cms_notification()
RETURNS VOID AS $$
BEGIN
    PERFORM pg_notify(
        'cms_event',
        json_build_object(
            'type', 'test',
            'entity', 'system',
            'entityId', 'test',
            'data', json_build_object('message', 'Test notification'),
            'timestamp', NOW(),
            'operation', 'TEST'
        )::TEXT
    );
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION notify_cms_event() TO PUBLIC;
GRANT EXECUTE ON FUNCTION notify_course_status_change() TO PUBLIC;
GRANT EXECUTE ON FUNCTION test_cms_notification() TO PUBLIC;

-- Create an index for better performance on notifications
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status);

-- Instructions for testing:
-- 1. Connect to your PostgreSQL database
-- 2. Run this script: psql -d your_database -f setup-realtime-triggers.sql
-- 3. Test with: SELECT test_cms_notification();
-- 4. Listen for events: LISTEN cms_event;
-- 5. Make changes to courses, blog posts, etc. to see notifications
