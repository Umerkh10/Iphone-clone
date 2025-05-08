import { Html } from "@react-three/drei"
import { Loader2Icon } from "lucide-react"

function Loader() {
  return (
    <Html>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="w-[10vw] h-[10vw] rounded-full flex justify-center items-center gap-2"> <Loader2Icon className="animate-spin w-6 h-6"/> Loading</div>
        </div>
    </Html>
  )
}

export default Loader