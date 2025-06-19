const HomePage = () => {
  const handleLogout = () => {
    localStorage.removeItem('auth')
    window.location.href = '/login'
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Welcome to the Home Page!</h1>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}>
        Log Out
      </button>
    </div>
  )
}

export default HomePage
