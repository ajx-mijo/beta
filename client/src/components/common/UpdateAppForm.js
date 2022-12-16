
import ImageUpload from '../../helpers/ImageUpload'
import LogoUpload from '../../helpers/LogoUpload'

import UpdateToolDropdown from '../../helpers/UpdateToolDropdown'
import UpdateSectorDropdown from '../../helpers/UpdateSectorDropdown'

const UpdateAppForm = ({ app, handleSubmit, formFields, setFormFields, errors, setErrors }) => {


  const handleChange = (e) => {
    console.log(typeof `${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.name === 'tools' || e.target.name === 'sectors' ? [parseInt(e.target.value)] : e.target.value })
    setErrors({ ...errors, [e.target.name]: '', message: '' })
  }


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
            <div className='form-fields'>
              <UpdateToolDropdown setFormFields={setFormFields} defaultTools={formFields.tools} />
            </div>
            {errors && errors.tools && <small className='text-danger'>{errors.tools}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Select your project type:</p>
            <div className='form-fields'>
              <UpdateSectorDropdown setFormFields={setFormFields} defaultSectors={formFields.sectors} />
            </div>
            {errors && errors.sectors && <small className='text-danger'>{errors.sectors}</small>}
          </div>
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