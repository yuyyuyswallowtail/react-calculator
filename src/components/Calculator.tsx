import { Card } from "@/components/ui/card";
import CalculatorButton from "./CalculatorButton";
import useScientificCalculator from "@/hooks/useScientificCalculator";

export default function ScientificCalculator() {
  const {
    input,
    answer,
    angleUnit,
    toggleAngleUnit,
    handleInput,
    evaluateExpression,
    clearAll,
    backspace,
  } = useScientificCalculator();

  const buttons = [
    "Deg",
    "Rad",
    "x!",
    "(",
    ")",
    "%",
    "AC",
    "Inv",
    "sin",
    "ln",
    "7",
    "8",
    "9",
    "÷",
    "π",
    "cos",
    "log",
    "4",
    "5",
    "6",
    "×",
    "e",
    "tan",
    "√",
    "1",
    "2",
    "3",
    "−",
    "Ans",
    "EXP",
    "xʸ",
    "0",
    ".",
    "⌫",
    "+",
    "=",
  ];

  const getVariant = (label: string) => {
    if (["="].includes(label)) return "destructive";
    if (
      ["Deg", "Rad", "Inv", "Ans", "AC", "÷", "×", "−", "+", "⌫"].includes(
        label,
      )
    )
      return "default";
    return "secondary";
  };

  const onClickButton = (label: string) => {
    switch (label) {
      case "AC":
        clearAll();
        break;
      case "=":
        evaluateExpression();
        break;
      case "⌫":
        backspace();
        break;
      case "Deg":
        if (angleUnit !== "deg") toggleAngleUnit();
        break;
      case "Rad":
        if (angleUnit !== "rad") toggleAngleUnit();
        break;
      case "Ans":
        handleInput(answer);
        break;
      case "÷":
        handleInput("/");
        break;
      case "×":
        handleInput("*");
        break;
      case "−":
        handleInput("-");
        break;
      case "+":
        handleInput("+");
        break;
      case "xʸ":
        handleInput("^");
        break;
      case "ln":
        handleInput("ln(");
        break;
      case "log":
        handleInput("log(");
        break;
      case "√":
        handleInput("sqrt(");
        break;
      case "EXP":
        handleInput("e");
        break;
      case "x!":
        handleInput("!");
        break;
      default:
        handleInput(label);
    }
  };

  return (
    <div className="dark flex justify-center items-center min-h-screen bg-muted px-4">
      <Card className="p-6 w-full max-w-3xl rounded-3xl shadow-xl bg-background border-2 border-primary">
        {/* Display input */}
        <input
          type="text"
          value={input || 0}
          readOnly
          className="w-full text-right text-4xl font-mono bg-transparent border-none focus:outline-none border-primary"
        />

        {/* Display answer */}
        <div className="text-right text-lg text-primary-300 mb-6 min-h-[28px] select-text">
          {answer}
        </div>

        {/* Buttons grid */}
        <div className="grid grid-cols-7 gap-3">
          {buttons.map((label) => (
            <CalculatorButton
              key={label}
              label={label}
              variant={getVariant(label)}
              onClick={() => onClickButton(label)}
              className={`${
                (label === "Deg" && angleUnit === "deg") ||
                (label === "Rad" && angleUnit === "rad")
                  ? "bg-primary-500 text-white shadow-lg"
                  : "text-primary-100"
              } transition-colors duration-200`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
