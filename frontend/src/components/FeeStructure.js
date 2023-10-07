import React, { useEffect, useState } from "react";
import "./css/FeeStructure.css";
export default function FeeStructure() {
  const schoolName = localStorage.getItem("academic"); //  for accessing the school name
  // const [getData, setGetData] = useState([]);
  const [transformedData] = useState([])
  // usestate for rendering the components
  const [rendering, setRendering] = useState(false)
  // USING THE USEEFFECT
  useEffect(() => {
    const fetchFees = async () => {
      let getApi = await fetch(process.env.REACT_APP_FEESTRUCTURE_API, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (getApi) {
        getApi = await getApi.json();
        let dataObject = getApi[0]

        for (const grade in dataObject) {
          if (dataObject.hasOwnProperty(grade)) {
            const gradeData = JSON.parse(dataObject[grade]);

            // Push the transformed data to the array
            transformedData.push({
              grade: grade,
              monthly_fees: gradeData.monthly_fess,
              admission_fees: gradeData.admission_fees,
              exam_fees: gradeData.exam_fees,
            });
          }
        }

      }
      setRendering(true)
    };

    // CALLING THE FUNCTION HERE
    fetchFees();

  }, [transformedData]);

  // FUNCTION FOR FETCHING THE FEES STRUCTURE

  return (
    <>

      <h1 className="text-center text-light mt-3">
        Fee Structure - <span className="text-warning">{schoolName}</span>{" "}   <span className="hideSpan">{rendering}</span>
      </h1>
      <div className="container myMainContainer">
        <div className="row mt-5">
          <div className="col-12">
            <table className="table table-bordered">
              <thead className="thead-dark">
           
                <tr>
                  <th scope="col">Class</th>
                  <th scope="col">Monthly Fee</th>
                  <th scope="col">Admission Fee</th>
                  <th scope="col">Exam Fee</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {transformedData.map((item, index) => {

                  return (
                    <tr className="text-light" key={index} >
                   
                      <td>{item.grade}</td>
                      <td>&#8377; {item.monthly_fees}</td>
                      <td>&#8377; {item.admission_fees}</td>
                      <td>&#8377; {item.exam_fees}</td>
                      <td className="text-light bg-info">&#8377; {item.monthly_fees + item.admission_fees + item.exam_fees}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
