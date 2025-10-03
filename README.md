# Shikshanam Content Management Workflow

This document outlines the content management workflow for the Shikshanam Next.js application. The platform uses a JSON-based file system for managing content, specifically for the homepage.

## Key Concepts

The CMS operates on a simple yet effective draft-and-publish model.

-   **Draft Content**: All content edits and updates are made to a "draft" file. This allows you to work on changes without affecting the live site.
-   **Published Content**: When you are ready to make your changes live, you "publish" the content. This action copies the draft content to a "published" file, which is what the live production site displays.
-   **On-Demand Revalidation**: The publishing process automatically triggers a revalidation of the homepage. This means your changes will be visible on the live site within seconds, without requiring a full redeployment of the application.

## The Workflow in Practice

1.  **Editing Content**:
    -   Navigate to the CMS editor in the application.
    -   Make your desired changes to the homepage content.
    -   When you save your changes in the editor, the application updates the draft content file.

2.  **Publishing Content**:
    -   Once you are satisfied with your changes, click the "Publish" button in the CMS interface.
    -   This action triggers the publish API, which copies the draft content to the published content file and tells the frontend to update.

## Key Files and Directories

-   `data/homepage-content.json`: This is the **draft** content file. The CMS editor writes to this file.
-   `data/homepage-content.published.json`: This is the **published** content file. The live production site reads from this file.
-   `app/api/cms/content/route.ts`: This API route handles saving (`PUT`) and retrieving (`GET`) content for the CMS editor. In development, it reads the draft file to provide a live preview. In production, it reads the published file.
-   `app/api/cms/publish/route.ts`: This API route handles the publishing process. It copies the content from the draft file to the published file and triggers the revalidation of the homepage.

## For Developers

-   To see draft changes locally, simply run the application in development mode (`npm run dev`). The content API is configured to serve the draft file in this environment.
-   The `ContentManager` class in `lib/cms/content-manager.ts` is responsible for creating the initial draft file if it doesn't exist, using a default content structure.

This streamlined workflow ensures a clear separation between draft and published content, providing a safe and efficient way to manage the website's content.