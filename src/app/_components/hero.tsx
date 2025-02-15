"use client";
//@ts-ignore
import confetti from "canvas-confetti";

const HeroSection = () => {
  const handleClick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("clicked");
    try {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      await confetti({
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
      });
    } catch (error) {
      console.error("Confetti button error:", error);
    }
  };

  return (
    <div className="hero w-full overflow-hidden bg-base-100 py-20">
      <div className="hero-content w-full gap-20 flex-col-reverse lg:flex-row-reverse lg:justify-between">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Prepare for my trip</h2>
            <div className="form-control">
              {[
                "Book transportation & hotel",
                "Pack clothes & toiletries",
                "Carry passport & ID",
                "Take medications & first-aid",
                "Exchange currency & check cards",
                "Plan itinerary & book tickets",
              ].map((item, index) => (
                <label key={index} className="label cursor-pointer">
                  <span className="label-text">{item}</span>
                  <input
                    onChange={(e) => {
                        if (e.target.checked) {
                            handleClick(e)
                        }
                    }}
                    type="checkbox"
                    defaultChecked={Math.random() > 0.5}
                    className="checkbox-success checkbox"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold">
            <span className="text-success">Organize your life</span> <br />
            with ease
          </h1>
          <p className="py-6">
            Easily browse through community created checklists <br /> or create
            your own.
          </p>
          <div className="flex flex-col gap-2">
          <button className="btn btn-success">CREATE ME A LIST</button>
          <button className="btn btn-ghost">I HAVE AN ACCOUNT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
