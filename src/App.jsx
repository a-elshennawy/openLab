import { useState, use, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

async function fetchTests() {
  const res = await fetch("/labTests.json");
  const data = await res.json();
  return data;
}

const testsPromise = fetchTests();

function App() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const formRef = useRef();

  const tests = use(testsPromise);

  const handleTestChange = (e) => {
    const testId = e.target.value;
    const test = tests.find((t) => t.id === testId);
    setSelectedTest(test);
  };

  const downloadPDF = () => {
    // 1. Get the HTML element we want to convert (the form)
    const input = formRef.current;

    // 2. Take a "screenshot" of that HTML element
    html2canvas(input).then((canvas) => {
      // html2canvas returns a Promise
      // When done, we get a <canvas> element with our form drawn on it

      // 3. Convert the canvas to an image (PNG format, encoded as base64 string)
      const imgData = canvas.toDataURL("image/png");
      // imgData looks like: "data:image/png;base64,iVBORw0KGgoAAAA..."

      // 4. Create a new PDF document
      // "p" = portrait orientation
      // "mm" = millimeters as unit
      // "a4" = A4 paper size
      const pdf = new jsPDF("p", "mm", "a4");

      // 5. Get the PDF page dimensions (in millimeters)
      const pdfWidth = pdf.internal.pageSize.getWidth(); // ~210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // ~297mm

      // 6. Get the image dimensions (in pixels)
      const imgWidth = canvas.width; // e.g., 800px
      const imgHeight = canvas.height; // e.g., 1200px

      // 7. Calculate the ratio to fit the image inside the PDF page
      // We want the image to fit without being cut off
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      // Example: Math.min(210/800, 297/1200) = Math.min(0.26, 0.25) = 0.25
      // This means: shrink the image to 25% of its original size

      // 8. Center the image horizontally on the PDF page
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      // Example: (210 - 800*0.25) / 2 = (210 - 200) / 2 = 5mm from left

      // 9. Position from top (30mm margin)
      const imgY = 0;

      // 10. Add the image to the PDF
      pdf.addImage(
        imgData, // The image data (base64 string)
        "PNG", // Image format
        imgX, // X position (horizontal)
        imgY, // Y position (vertical)
        imgWidth * ratio, // Width in PDF (scaled down)
        imgHeight * ratio // Height in PDF (scaled down)
      );

      // 11. Download the PDF file
      pdf.save(`${name}_${selectedTest.name}.pdf`);
      // Creates a file like "ahmed_Thyroid Function Tests.pdf"
    });
  };

  return (
    <>
      <section className="container-fluid row justify-content-center align-items-center m-0 p-3 text-center">
        <div className="col-5">
          <form className="selectionForm p-0 mb-3">
            <select value={selectedTest?.id || ""} onChange={handleTestChange}>
              <option value="" disabled>
                select test
              </option>
              {tests.map((test) => (
                <option key={test.id} value={test.id}>
                  {test.name} - ({test.category})
                </option>
              ))}
            </select>
            <br />
            <button className="mt-2" type="button" onClick={downloadPDF}>
              Download PDF Report
            </button>
          </form>

          {selectedTest && (
            <form
              ref={formRef}
              className="dataForm row justify-content-start align-items-start gap-2 text-start m-0"
            >
              <div className="col-12 row justify-content-between align-items-center m-0 p-0 mb-3">
                <div className="header col-5 m-0 p-0 ">
                  <h3 className="m-0 p-0 pb-1">{selectedTest.name}</h3>
                  <h6 className="m-0 p-0">{selectedTest.category}</h6>
                </div>

                <div className="col-5 text-end m-0 p-0 ">
                  <div className="text-end">
                    <img src="/logo.png" alt="" />
                    <h6 className="m-0 p-0">open lab</h6>
                  </div>
                </div>
              </div>

              <div className="inpContainer col-3 m-0 p-0">
                <label className="m-0 p-0 mb-1">name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </div>
              <div className="inpContainer col-3 m-0 p-0">
                <label className="m-0 p-0 mb-1">age</label>
                <input type="number" />
              </div>
              <div className="inpContainer col-3 m-0 p-0">
                <label className="m-0 p-0 mb-1">gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
              {selectedTest.testFields.map((field) => {
                const normalRange =
                  field.normalRange[gender] || field.normalRange.all;

                return (
                  <div
                    key={field.name}
                    className="inpContainer col-lg-5 col-md-4 col-10 m-0 p-0"
                  >
                    <label className="m-0 p-0 mb-1">
                      {field.label}{" "}
                      <small>{field.unit && `(${field.unit})`}</small>
                      <br />
                      <small>Normal : {normalRange}</small>
                    </label>
                    <input type="text" />
                  </div>
                );
              })}
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
