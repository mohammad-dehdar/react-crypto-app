
function Layout({children}) {
  return (
    <>
      <header className="flex flex-col md:flex-row items-center justify-between bg-blue-400 py-2.5 px-5 mb-10 md:mb-[150px] rounded-lg">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2 md:mb-0">Crypto App</h1>
        <p className="text-center md:text-right">
          Mohammad Dehdar | 
          <a className="bg-blue-900 px-1 py-1 rounded-md shadow-md text-gray-300 transition-all hover:shadow-lg hover:shadow-white ml-2" href="">Github Link</a>
        </p>
      </header>
      {children}
      <footer className="bg-blue-400 py-2.5 px-5 text-center mt-10 md:mt-0 mb-2 rounded-lg">
        <p>developed by <a href="">Mohammad Dehdar ❤️</a></p>
      </footer>
    </>
  )
}

export default Layout