import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignStatusType } from './AuthProviderComponent';

const authProviders = [
  {
    id: "google",
    name: "Google",
    icon: <FcGoogle size={23} />,
  },
  {
    id: "github",
    name: "GitHub",
    icon: <FaGithub size={23} />, 
  },
]

function AuthProviderComponent({signStatus="Sign Up"}:{signStatus?:SignStatusType}) {
  
  return (
    <>
      <div className="flex flex-col gap-5 mt-3">
            {authProviders.map((provider)=><AuthProviderComponent key={provider.id} signStatus={signStatus} {...provider} />)}
          </div>
    </>
  )
}

export default AuthProviderComponent