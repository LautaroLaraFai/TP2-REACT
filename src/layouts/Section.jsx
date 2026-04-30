export default function Section({title, children}){

  // PUEDE NO TENER TÍTULO

  return (
    <section className="w-full pt-1">
      {title && (
        <>
          <div className="md:border-t-4 max-md:border-t-3 border-a-amber w-full"/>
          <div className="px-wrap-md-br">
            <div className="px-border-md-br bg-a-amber -inset-0.75"/>
            <div className="px-inner-md-br lg:px-20 md:px-16 sm:px-10 max-sm:px-8 py-4 max-sm:py-2 bg-p-bg">
              <h2 className="lg:text-[1.8em] md:text-[1.6em] sm:text-[1.2em] max-sm:text-[1em] tracking-[.07em] text-a-amber">
                {title}
              </h2>
            </div>
          </div>        
        </>
      )}

      {children}

    </section>
  )
}