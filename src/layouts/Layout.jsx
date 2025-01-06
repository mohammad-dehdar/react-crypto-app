

function Layout({children}) {
  return (
    <>
    <header className="flex items-center justify-between bg-blue-400 py-2.5 px-5 mb-[150px] rounded-lg">
        <h1 className="text-3xl font-extrabold">Crypto App</h1>
        <p>Mohammad Dehdar | <a className="bg-blue-900 px-1 py-1 rounded-md shadow-md text-gray-300 transition-all hover:shadow-lg hover:shadow-white" href="">Github Link</a></p>
    </header>
    {children}
    <footer className=" bg-blue-400 py-2.5 px-5 text-center mb-2 rounded-lg">
        <p>developed by <a href="">Mohammad Dehdar ❤️</a></p>
    </footer>
    </>
  )
}

export default Layout