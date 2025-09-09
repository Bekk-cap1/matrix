import { useState } from 'react'
import { m, motion, number } from "motion/react"
import './App.css'

function App() {
  const [cols, setCols] = useState(0)
  const [colsSec, setColsSec] = useState(0)
  const [rows, setRows] = useState(0)
  const [rowsSec, setRowsSec] = useState(0)

  const [data, setData] = useState([])
  const [dataSec, setDataSec] = useState([])
  const [result, setResult] = useState({
    multiply: '',
    plus: "",
    minus: "",
    determinant: "",
    transpose: ""
  })

  const createTable = () => {
    console.log(rowsSec);
    console.log(colsSec);

    if (rowsSec == 0 && colsSec > 0 || rowsSec > 0 && colsSec == 0) {
      setRowsSec(0)
      setColsSec(0)
      return alert("please check your items, second rows and cols must be write both of them or equal to 0")
    }
    const newData = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => "")
    )
    setData(newData)

    const newDataSec = Array.from({ length: rowsSec }, () =>
      Array.from({ length: colsSec }, () => "")
    )
    setDataSec(newDataSec)
  }

  const handleChange = (r, c, value) => {
    setData(prev => {
      const copy = [...prev];
      copy[r][c] = value;
      return copy
    })
  }

  const handleChangeSec = (r, c, value) => {
    setDataSec(prev => {
      const copy = [...prev];
      copy[r][c] = value;
      return copy
    })
  }

  function determinant(matrix) {
    const n = matrix.length;

    if (n === 1) return matrix[0][0];

    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let col = 0; col < n; col++) {
      const minor = matrix.slice(1).map(row =>
        row.filter((_, j) => j !== col)
      );

      det += (col % 2 === 0 ? 1 : -1) * matrix[0][col] * determinant(minor);
    }
    return det;
  }
  function transpose(matrix) {
    return matrix[0].map((_, index) =>
      matrix.map(row => row[index])
    )
  }

  function plus(a, b) {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      alert("Матрицы должны быть одинакового размера")
    }else{
      return a.map((row, i) =>
        row.map((val, j) => val + b[i][j])
      )
    }
  }

  function minus(a, b) {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      alert("Матрицы должны быть одинакового размера")
    }else{
      return a.map((row, i) =>
        row.map((val, j) => val - b[i][j])
      )
    }
  }

  function multiplyMatrices(a, b) {
    if (a[0].length !== b.length) {
      alert("Количество столбцов A должно быть равно количеству строк B");
    }

    return a.map((row, i) =>
      b[0].map((_, j) =>
        row.reduce((sum, _, k) => sum + a[i][k] * b[k][j], 0)
      )
    );
  }


  const findElements = () => {
    if (data.length > 0 && dataSec.length === 0) {
      const hasEmpty = data.some(arrays =>
        arrays.some(t => t === '')
      );

      if (hasEmpty) {
        return alert("зАполните все поля");
      }

      if (rows == cols) {
        const det = determinant(data.map(row => row.map(Number)));
        setResult((prev) => ({
          ...prev,
          determinant: det
        }));
      }
      const trans = transpose(data.map(row => row.map(Number)))
      setResult(prev => ({
        ...prev,
        transpose: trans,
        plus: "",
        minus: "",
        multiply: ""
      }))
    } else {
      if (rows || cols || rowsSec || colsSec) {
        const add = plus(
          data.map(r => r.map(Number)),
          dataSec.map(q => q.map(Number))
        )
        const min = minus(
          data.map(r => r.map(Number)),
          dataSec.map(q => q.map(Number))
        )
        const multiply = multiplyMatrices(
          data.map(r => r.map(Number)),
          dataSec.map(q => q.map(Number))
        )
        setResult((prev) => ({
          ...prev,
          plus: add,
          multiply: multiply,
          minus: min,
          determinant: "",
          transpose: ""
        }))

      }
    }
  };


  // console.log(result.plus == "" && result.plus.some(q=>q == NaN));
//   result.plus !== "" && result.plus.map((e)=>
//     e.map((q)=>{
//       console.log(q);
//     })
// )
  


  return (
    <>
      <div className="justify-center text-center mx-auto w-full">
        <motion.div className='flex items-center justify-center gap-4'>
          <div>
            <label htmlFor="col-matrix">First Write matrix cols</label> <br />
            <input
              value={cols}
              type="number"
              max={10}
              name="column"
              id='col-matrix'
              className='p-1 my-2 border-1 border-blue-500 outline-none'
              onChange={(e) => setCols(e.target.value)}
            /> <br />
            <label htmlFor="row-matrix">First Write matrix rows</label> <br />
            <input
              value={rows}
              type="number"
              max={10}
              name='rows'
              id='rows-matrix'
              className='p-1 my-2 border-1 border-blue-500 outline-none'
              onChange={e => setRows(e.target.value)}
            /> <br />
            <ul>
              <li>Your first columns equal to {cols}</li>
              <li>Your first rows equal to {rows}</li>
            </ul>
          </div>
          <div>
            <label htmlFor="colSec-matrix">Second Write matrix cols</label><br />
            <input
              value={colsSec}
              type="number"
              max={5}
              name="column"
              id='colSec-matrix'
              className='p-1 my-2 border-1 border-blue-500 outline-none'
              onChange={(e) => setColsSec(e.target.value)}
            /> <br />
            <label htmlFor="row-matrix">Second Write matrix rows</label> <br />
            <input
              value={rowsSec}
              type="number"
              max={5}
              name='rowsSec'
              id='rowsSec-matrix'
              className='p-1 my-2 border-1 border-blue-500 outline-none'
              onChange={e => setRowsSec(e.target.value)}
            /> <br />
            <ul>
              <li>Your second columns equal to {colsSec}</li>
              <li>Your second rows equal to {rowsSec}</li>
            </ul>
          </div>
        </motion.div>
        <motion.button type='submit' className='btn btn-primary btn-md mt-6' onClick={createTable}>Paint table</motion.button>
        <div className='flex justify-between gap-10 mx-5 my-2'>
          {
            data.length > 0 && (
              <table className="w-full mt-5">
                <tbody>
                  {data.map((row, rowsI) => (
                    <tr key={rowsI}>
                      {row.map((cell, cIndex) => (
                        <td key={cIndex} className="">
                          <input
                            type="number"
                            value={cell}
                            onChange={e =>
                              handleChange(rowsI, cIndex, e.target.value)
                            }
                            className="w-full border px-1 py-2 outline-none"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
          {
            dataSec.length > 0 && (
              <table className="w-full mt-5">
                <tbody>
                  {dataSec.map((row, rowsI) => (
                    <tr key={rowsI}>
                      {row.map((cell, cIndex) => (
                        <td key={cIndex} className="">
                          <input
                            type="number"
                            value={cell}
                            onChange={e =>
                              handleChangeSec(rowsI, cIndex, e.target.value)
                            }
                            className="w-full border px-1 py-2 outline-none"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
        <button className='btn btn-success btn-md' onClick={findElements}>Find</button>
        <h2>Results:</h2>
        <ul className=''>
          <li className='mt-10'>Determinant: {result.determinant}</li>
          <li className='mt-10'>Minus: 
            <table className='w-full justify-center'>
              <tbody>
                {
                  result.minus !== "" && result?.minus?.map((item, i) => (
                    <tr>
                      {
                        result.minus !== "" && result.minus[i].map(e => (
                          <td className={`border-2 border-amber-50 w-1/${result.minus[i].length}`}>{e}</td>
                        ))
                      }
                    </tr>

                  ))
                }
              </tbody>
            </table>
          </li>
          <li className='mt-10'>Transpose:
            <table className='w-full justify-center'>
              <tbody>
                {
                  result.transpose !== "" && result?.transpose?.map((_, index) => (
                    <tr>
                      {
                        result.transpose !== "" && result?.transpose[index].map(e => (
                          <td className={`border-2 border-amber-50 w-1/${result.transpose[index].length}`}>{e}</td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </li>
          <li className='mt-10'>Plus:
            <table className='w-full justify-center'>
              <tbody>
                {
                  result.plus !== "" && result?.plus?.map((item, i) => (
                    <tr>
                      {
                        result.plus !== "" && result.plus[i].map(e => (
                          <td className={`border-2 border-amber-50 w-1/${result.plus[i].length}`}>{e}</td>
                        ))
                      }
                    </tr>

                  ))
                }
              </tbody>
            </table>
          </li>
          <li className='mt-10'>Multiply:
            <table className='w-full justify-center'>
              <tbody>
                {
                  result.multiply !== "" && result?.multiply?.map((_, index) => (
                    <tr>
                      {
                        result.multiply !== "" && result.multiply[index].map(e => (
                          <td className={`border-2 border-amber-50 w-1/${result.multiply[index].length}`}>{e}</td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </li>
        </ul>
      </div>
    </>
  )
}

export default App
