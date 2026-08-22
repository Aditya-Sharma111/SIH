import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
  return (
    <div
      className="min-h-screen relative flex items-start justify-start overflow-hidden"
      style={{
        backgroundImage: "url('/image/Login_page.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "auto",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Very subtle dark overlay so form text stays readable */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Auth form — left side, transparent, with huge padding */}
      <div className="relative z-10 w-full md:w-auto md:min-w-[360px] px-8 py-12 flex flex-col justify-center min-h-screen" style={{marginLeft:"220px", padding:"10px"}}>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-transparent shadow-none border-0 w-full",
              headerTitle: "text-2xl font-bold text-white",
              headerSubtitle: "text-zinc-300",
              socialButtonsBlockButton:
                "bg-white/5 border border-white/20 hover:bg-white/10 text-white transition-all rounded-xl py-3",
              socialButtonsBlockButtonText: "text-white font-medium",
              dividerLine: "bg-white/20",
              dividerText: "text-zinc-400",
              formFieldLabel: "text-zinc-200 font-medium",
              formFieldInput:
                "bg-white/10 border-white/20 text-white placeholder-zinc-400 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl",
              formButtonPrimary:
                "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white border-0 shadow-lg shadow-emerald-500/20 transition-all rounded-xl py-2.5",
              footerActionText: "text-zinc-300",
              footerActionLink: "text-emerald-400 hover:text-emerald-300",
            },
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "blockButton",
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}

export default SignInPage