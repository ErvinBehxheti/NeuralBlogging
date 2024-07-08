"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaEnvelope, FaLock, FaGithub, FaGoogle, FaLinkedin, FaGamepad } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SignInPage({ providers }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  // const handleOAuthSignIn = async (provider: string) => {
  //   setError(null);

  //   const result = await signIn(provider, { redirect: false });

  //   if (result?.error) {
  //     setError(result.error);
  //   } else {
  //     router.push("/");
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-purple-500/0 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 space-y-2">
          {Object.values(providers).map((provider) => (
            provider.type === 'oauth' && (
              <button
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className={`w-full py-2 rounded focus:outline-none focus:ring-2 flex items-center justify-center ${
                  provider.id === 'github' ? 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-800' :
                  provider.id === 'google' ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600' :
                  provider.id === 'linkedin' ? 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-700' :
                  provider.id === 'faceit' ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500' :
                  ''
                }`}
              >
                {provider.id === 'github' && <FaGithub className="mr-2" />}
                {provider.id === 'google' && <FaGoogle className="mr-2" />}
                {provider.id === 'linkedin' && <FaLinkedin className="mr-2" />}
                {provider.id === 'faceit' && <FaGamepad className="mr-2" />}
                Sign in with {provider.name}
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
