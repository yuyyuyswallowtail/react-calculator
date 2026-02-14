import { useState } from "react";
import { create, all } from "mathjs";

const math = create(all);

export default function useScientificCalculator() {
  const [input, setInput] = useState<string>("");
  const [angleUnit, setAngleUnit] = useState<"deg" | "rad">("rad");
  const [answer, setAnswer] = useState<string>("");

  // Fungsi toggle antara degree dan radian
  const toggleAngleUnit = () => {
    setAngleUnit((prev) => (prev === "rad" ? "deg" : "rad"));
  };

  // Function untuk hitung factorial
  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    return n * factorial(n - 1);
  };

  // Evaluasi dengan mathjs dan custom fungsi factorial
  const evaluateExpression = () => {
    try {
      // Daftarkan fungsi custom factorial ke mathjs
      math.import(
        {
          factorial: factorial,
          fact: factorial,
          // Override sin, cos, tan untuk handle deg/rad
          sin: (x: number) =>
            angleUnit === "deg" ? math.sin(math.unit(x, "deg")) : math.sin(x),
          cos: (x: number) =>
            angleUnit === "deg" ? math.cos(math.unit(x, "deg")) : math.cos(x),
          tan: (x: number) =>
            angleUnit === "deg" ? math.tan(math.unit(x, "deg")) : math.tan(x),
        },
        { override: true },
      );

      // Ganti input "x!" ke factorial(n)
      const formattedInput = input.replace(/(\d+)!/g, "factorial($1)");

      // Evaluasi dengan mathjs
      const result = math.evaluate(formattedInput);

      setAnswer(String(result));
      setInput(String(result));
    } catch (error) {
      console.error(error);
      setAnswer("Error");
    }
  };

  // Handle tombol input
  const handleInput = (value: string) => {
    setInput((prev) => prev + value);
  };

  // Reset kalkulator
  const clearAll = () => {
    setInput("");
    setAnswer("");
  };

  // Hapus karakter terakhir
  const backspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  return {
    input,
    answer,
    angleUnit,
    toggleAngleUnit,
    handleInput,
    evaluateExpression,
    clearAll,
    backspace,
  };
}
