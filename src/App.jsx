import { useState } from 'react'
import { motion } from "motion/react"
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

    if (rows != cols) {
      alert("если вы хотите только одну матрицу и найти determinant, то строка и столбцы должны быть одинаковы (2х2, 3х3, ...)")
    }
    if (rowsSec != 0 || colsSec != 0) {
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

  const findElements = () => {
    if (data.length > 0 && dataSec.length === 0) {
      const hasEmpty = data.some(arrays =>
        arrays.some(t => t === '')
      );

      if (hasEmpty) {
        return alert("зАполните все поля");
      }

      if (rows === cols) {
        const det = determinant(data.map(row => row.map(Number)));
        setResult({ determinant: det });
      } else {
        alert("Детерминант существует только у квадратных матриц");
      }
    }
  };


  console.log(result);


  return (
    <>
      <div className="justify-center text-center">
        <motion.div className='flex items-center justify-center gap-4'>
          <div>
            <label htmlFor="col-matrix">First Write matrix cols</label> <br />
            <input
              value={cols}
              type="number"
              max={5}
              name="column"
              id='col-matrix'
              className='p-1 my-2 border-1 border-blue-500 outline-none'
              onChange={(e) => setCols(e.target.value)}
            /> <br />
            <label htmlFor="row-matrix">First Write matrix rows</label> <br />
            <input
              value={rows}
              type="number"
              max={5}
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
              <table className="table-auto w-full mt-5">
                <tbody>
                  {data.map((row, rowsI) => (
                    <tr key={rowsI}>
                      {row.map((cell, cIndex) => (
                        <td key={cIndex} className="border">
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
              <table className="table-auto border-collapse border border-gray-400 w-full mt-5">
                <tbody>
                  {dataSec.map((row, rowsI) => (
                    <tr key={rowsI}>
                      {row.map((cell, cIndex) => (
                        <td key={cIndex} className="border">
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
        <ul>
          <li>Determinant: {result.determinant}</li>
        </ul>
      </div>
    </>
  )
}

export default App
