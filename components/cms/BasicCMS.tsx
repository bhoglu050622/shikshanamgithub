export default function BasicCMS() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Content Management System</h1>
          <p className="text-slate-600">Manage your website content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Homepage</h3>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                active
              </span>
            </div>
            <p className="text-slate-600 mb-4">Main homepage content</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 capitalize">main</span>
              <button className="px-4 py-2 bg-saffron-600 text-white rounded-md hover:bg-saffron-700 transition-colors">
                Edit
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">About</h3>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                active
              </span>
            </div>
            <p className="text-slate-600 mb-4">About page content</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 capitalize">main</span>
              <button className="px-4 py-2 bg-saffron-600 text-white rounded-md hover:bg-saffron-700 transition-colors">
                Edit
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Contact</h3>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                active
              </span>
            </div>
            <p className="text-slate-600 mb-4">Contact page content</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 capitalize">main</span>
              <button className="px-4 py-2 bg-saffron-600 text-white rounded-md hover:bg-saffron-700 transition-colors">
                Edit
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Blog Posts</h3>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                coming-soon
              </span>
            </div>
            <p className="text-slate-600 mb-4">Blog content management</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 capitalize">content</span>
              <button className="px-4 py-2 bg-saffron-600 text-white rounded-md hover:bg-saffron-700 transition-colors">
                Edit
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Sanskrit Course</h3>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                active
              </span>
            </div>
            <p className="text-slate-600 mb-4">Sanskrit language course</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 capitalize">education</span>
              <button className="px-4 py-2 bg-saffron-600 text-white rounded-md hover:bg-saffron-700 transition-colors">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
