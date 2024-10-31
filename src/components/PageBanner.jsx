
const PageBanner = ({page}) => {
  return (
    <div className={`py-3 px-4 bg-dark text-primary`}>
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2">
            <div className={`flex items-center text-center justify-center md:text-left md:justify-start my-8`}>
                <aside>
                  <h1 className={`text-white text-6xl font-black mb-4 capitalize`}>
                    { page.title }
                  </h1>
                  <p className={`text-slate-300 font-normal text-lg mb-4`}>
                    { page.description }
                  </p>
                </aside>
            </div>
        </section>
    </div>
  )
}

export default PageBanner