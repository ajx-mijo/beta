import GetAllSectors from '../../helpers/GetAllSectors'
import GetAllTools from '../../helpers/GetAllTools'
import ImageUpload from '../../helpers/ImageUpload'
import LogoUpload from '../../helpers/LogoUpload'

const UpdateAppForm = ({ app, handleSubmit, formFields, setFormFields, errors, setErrors }) => {


  const handleChange = (e) => {
    console.log(typeof `${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.name === 'tools' || e.target.name === 'sectors' ? [parseInt(e.target.value)] : e.target.value })
    setErrors({ ...errors, [e.target.name]: '', message: '' })
  }

  // const handleSectorChange = (e) => {
  //   console.log('Sector change type ->', typeof `${e.target.name}: ${e.target.value}`)
  //   console.log('Sector change ->', `${e.target.name}: ${e.target.value}`)
  //   console.log('Type of f.sect->', typeof `${formFields.sectors}`)
  //   const newArr = [...formFields.sectors[e.target.name]: e.target.value]
  //   console.log('New Arr =>', newArr)
  // }
  // const handleToolChange = (e) => {
  //   console.log('Tool change type ->', typeof `${e.target.name}: ${e.target.value}`)
  //   console.log('Tool change ->', `${e.target.name}: ${e.target.value}`)
  //   console.log('Type of fF.tools->', typeof `${formFields.tools}`)
  //   const newArr = [...formFields.tools]
  //   console.log('New Arr =>', newArr)
  // }


  return (
    <>
      <div id="location-form" className="form-container">
        <form onSubmit={handleSubmit}>
          <div className='form-fields'>
            <p className='form-titles'>Enter your project name:</p>
            <input
              required
              className="form-control mt-1 mb-3 "
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              placeholder={app.name}
              value={formFields.name}
            />
            {errors && errors.name && <small className='text-danger'>{errors.name}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Upload your Project logo:</p>
            <LogoUpload
              imageFormData={formFields}
              setFormData={setFormFields}
            />
            {errors && errors.site_images && <small className='text-danger'>{errors.site_images}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Submit a link to your project:</p>
            <input
              required
              className="form-control mt-1 mb-3 "
              type="text"
              name="link"
              id="link"
              onChange={handleChange}
              placeholder="Project link URL"
              value={formFields.link}
            />
          </div>
          {errors && errors.link && <small className='text-danger'>{errors.link}</small>}
          <div className='form-fields'>
            <p className='form-titles'>When was your project created:</p>
            <input
              required
              className="form-control mt-1 mb-3 "
              type="number"
              name="year"
              id="year"
              min='0'
              step='1'
              onChange={handleChange}
              placeholder="Year of publication"
              value={formFields.year}
            />
            {errors && errors.year && <small className='text-danger'>{errors.year}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Project Version:</p>
            <input
              required
              className="form-control mt-1 mb-3 "
              type="string"
              id="version"
              name="version"
              onChange={handleChange}
              placeholder="Project Version"
              value={formFields.version}
            />
            {errors && errors.version && <small className='text-danger'>{errors.version}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Select which tools you have used:</p>
            <select
              onChange={handleChange}
              name="tools"
              id="create-filter"
              type="text"
              className="dropdown-addApp "
              value={formFields.tools}
            >
              <GetAllTools />
            </select>
            {errors && errors.tools && <small className='text-danger'>{errors.tools}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Select your project type:</p>
            <select
              onChange={handleChange}
              name="sectors"
              id="create-filter"
              type="text"
              className="dropdown-addApp mt-3 mb-3 text-center"
              value={formFields.sectors}
            >
              <GetAllSectors />
            </select>
            {errors && errors.sectors && <small className='text-danger'>{errors.sectors}</small>}
          </div>





          {/* <div className="radio-buttons d-flex flex-column">
            <label className='radio-buttons-legend mb-2 text-left justify-content-start"'>Select all that apply:</label>
            <div className="all-radion-buttons d-flex flex-row justify-content-around">
              <div className="top-radio-buttons ">
                <fieldset >
                  <GetAllTools />
                  <div className="radio-buttons-large">
                    <div className="button-large">
                      <label htmlFor="parking">Paid Parking</label>
                      <input type="checkbox" id="parking" name="parking" value={formFields.parking} />
                    </div>
                    {errors && errors.parking && <small className='text-danger'>{errors.parking}</small>}
                    <div className="button-large">
                      <label htmlFor="toilets">Toilets</label>
                      <input type="checkbox" id="toilets" name="toilets" value={formFields.toilets} />
                    </div>
                    {errors && errors.freeParking && <small className='text-danger'>{errors.freeParking}</small>}
                  </div>
                </fieldset>
              </div>
              <div className="bottom-radio-buttons">
                <fieldset>
                  <div className="radio-buttons-large">
                    <div className="button-large">
                      <label htmlFor="freeParking">Free Parking</label>
                      <input type="checkbox" id="freeParking" name="freeParking" value={formFields.freeParking} />
                    </div>
                    {errors && errors.toilets && <small className='text-danger'>{errors.toilets}</small>}
                    <div className="button-large">
                      <label htmlFor="water">Water</label>
                      <input type="checkbox" id="water" name="water" value={formFields.water} />
                    </div>
                    {errors && errors.water && <small className='text-danger'>{errors.water}</small>}
                  </div>
                </fieldset>
              </div>
            </div>
          </div> */}




























          <div className='form-fields'>
            <p className='form-titles'>Add a description for your project:</p>
            <textarea
              required
              className="form-control mt-1 mb-3"
              type="text"
              id="description"
              name="description"
              rows='10'
              cols='30'
              onChange={handleChange}
              placeholder="Add a brief descirption..."
              value={formFields.description}
            />
            {errors && errors.description && <small className='text-danger'>{errors.description}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Tell us about any new features you have added:</p>
            <input
              required
              className="form-control mt-3 mb-3 "
              type="text"
              name="new_features"
              id="new_features"
              onChange={handleChange}
              placeholder="New Features"
              value={formFields.new_features}
            />
            {errors && errors.new_features && <small className='text-danger'>{errors.new_features}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Upload screenshots of your project:</p>
            <ImageUpload
              imageFormData={formFields}
              setFormData={setFormFields}
            />
            {errors && errors.site_images && <small className='text-danger'>{errors.site_images}</small>}
          </div>
          <button to={'/'} className="btn btn-danger btn-lg mt-3 mb-3">Submit</button>
          {errors && errors.message && <small className='text-danger'>{errors.message}</small>}
        </form>
      </div>
    </>
  )
}

export default UpdateAppForm