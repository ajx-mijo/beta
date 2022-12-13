
import GetAllSectors from '../../helpers/GetAllSectors'
import GetAllTools from '../../helpers/GetAllTools'
import ImageUpload from '../../helpers/LogoUpload'
import LogoUpload from '../../helpers/LogoUpload'

const AddAppForm = ({ handleSubmit, formFields, setFormFields, errors, setErrors }) => {


  const handleChange = (e) => {
    console.log(`${e.target.name}: ${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '', message: '' })
  }



  return (
    <>
      <div id="location-form" className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            required
            className="form-control mt-1 mb-3 "
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            placeholder="Project Name"
            value={formFields.name}
          />
          {errors && errors.name && <small className='text-danger'>{errors.name}</small>}
          <LogoUpload
            imageFormData={formFields}
            setFormData={setFormFields}
          />
          {errors && errors.site_images && <small className='text-danger'>{errors.site_images}</small>}
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
          {errors && errors.link && <small className='text-danger'>{errors.link}</small>}
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
          <input
            required
            className="form-control mt-3 mb-3 "
            type="text"
            name="new_features"
            id="new_features"
            onChange={handleChange}
            placeholder="Tell us which new features you have added"
            value={formFields.new_features}
          />
          {errors && errors.new_features && <small className='text-danger'>{errors.new_features}</small>}
          <ImageUpload
            imageFormData={formFields}
            setFormData={setFormFields}
          />
          {errors && errors.site_images && <small className='text-danger'>{errors.site_images}</small>}
          {errors && errors.message && <small className='text-danger'>{errors.message}</small>}
          <button to={'/'} className="btn btn-danger btn-lg mt-3 mb-3">Submit</button>
        </form>
      </div>
    </>
  )
}

export default AddAppForm