import Calculator from "@/components/Calculator/Calculator";
import { Basic } from "@/components/Basics/basic";
import Sum from "@/components/Basics/Sum";

export default function Home() {
  return (
    <div> 
      <Calculator />
         <Basic size="200px" color="red" marginTop="20px" />
         <Sum a={20} b={97} />
    </div>
  );
}
