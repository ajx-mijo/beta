
import { useState, useEffect } from 'react'


const ToolDisplay = ({ app }) => {
  // ! State for Tools Array
  const [tools, setTools] = useState(null)

  // ! Extracting Tools Objects from App object
  useEffect(() => {
    let toolsArray = []
    for (const tool of app.tools) {
      toolsArray.push(tool)
    }
    setTools(toolsArray)
    console.log(toolsArray)
  }, [app])


  return (
    <>
      {tools ?
        tools.map((tool) => {
          return (
            <>
              {/* <h4>{tool.name}</h4> */}
              <div key={tool.id}>
                <img src={tool.logo} alt='Developer tool logo' id='tool-logo' />
              </div>
            </>
          )
        })
        :
        <>No developer tools identified</>
      }
    </>
  )
}

export default ToolDisplay