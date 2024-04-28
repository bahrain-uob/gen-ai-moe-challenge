const SignIn = () => (
  <main className="bg-[#FBF9F1]">
    <section className="py-36 h-screen">
      <section className="w-2/5 flex max-container justify-center bg-[#619AA2] rounded-md min-h-full">
        <div className="flex flex-col justify-center items-center gap-10">
          <h3 className="text-4xl font-bold text-white">Sign In</h3>
          <div>
            <p className="text-white text-xl font-semibold">Email</p>
            <input></input>
            <p className="text-white text-xl font-semibold">Password</p>
            <input></input>
            <p className="text-white text-l">
              <input type="checkbox"></input> Remember Me
            </p>
          </div>

          <button
            className="flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full  
                        bg-[#AFA8A0] text-white border-[#AFA8A0]"
          >
            SignIn
          </button>

          <p className="text-white text-l text-decoration-line: underline">
            Forget Password?
          </p>
        </div>
      </section>
    </section>
  </main>
);

export default SignIn;
