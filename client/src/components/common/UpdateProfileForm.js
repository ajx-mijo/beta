import ProfileImageUpload from '../../helpers/ProfileImageUpload'


const UpdateAppForm = ({ app, handleSubmit, formFields, setFormFields, errors, setErrors }) => {


  const handleChange = (e) => {
    console.log(typeof `${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '', message: '' })
  }



  return (
    <>
      <div id="location-form" className="form-container">
        <form onSubmit={handleSubmit}>
          <div className='form-fields'>
            <p className='form-titles'>First Name:</p>
            <input
              required
              className="form-control mt-1 mb-3 "
              type="string"
              name="first_name"
              id="first_name"
              onChange={handleChange}
              placeholder="First Name"
              value={formFields.first_name}
            />
            {errors && errors.first_name && <small className='text-danger'>{errors.first_name}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Last Name:</p>
            <input
              required
              className="form-control mt-1 mb-3 "
              type="string"
              name="last_name"
              id="last_name"
              onChange={handleChange}
              placeholder="Last Name"
              value={formFields.last_name}
            />
          </div>
          {errors && errors.last_name && <small className='text-danger'>{errors.last_name}</small>}
          <div className='form-fields'>
            <p className='form-titles'>Current Role:</p>
            <input
              required
              className="form-control mt-1 mb-3 "
              type="string"
              id="current_role_title"
              name="current_role_title"
              onChange={handleChange}
              placeholder="Current Role"
              value={formFields.current_role_title}
            />
            {errors && errors.current_role_title && <small className='text-danger'>{errors.current_role_title}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Current employer:</p>
            <input
              required
              className="form-control mt-3 mb-3 "
              type="text"
              name="current_employer"
              id="current_employer"
              onChange={handleChange}
              placeholder="New Features"
              value={formFields.current_employer}
            />
            {errors && errors.current_employer && <small className='text-danger'>{errors.current_employer}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Years in Industry:</p>
            <input
              required
              className="form-control mt-1 mb-3 "
              type="number"
              name="years_exp"
              id="years_exp"
              min='0'
              step='1'
              onChange={handleChange}
              placeholder="Years in Industry:"
              value={formFields.years_exp}
            />
            {errors && errors.years_exp && <small className='text-danger'>{errors.years_exp}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Personal Bio:</p>
            <textarea
              required
              className="form-control mt-1 mb-3"
              type="text"
              id="biography"
              name="biography"
              rows='10'
              cols='30'
              onChange={handleChange}
              placeholder="Add a brief descirption..."
              value={formFields.biography}
            />
            {errors && errors.biography && <small className='text-danger'>{errors.biography}</small>}
          </div>
          <div className='form-fields'>
            <p className='form-titles'>Upload a profile picture:</p>
            <ProfileImageUpload
              imageFormData={formFields}
              setFormData={setFormFields}
            />
            {errors && errors.profile_image && <small className='text-danger'>{errors.profile_image}</small>}
          </div>
          <button to={'/'} className="btn btn-danger btn-lg mt-3 mb-3">Submit</button>
          {errors && errors.message && <small className='text-danger'>{errors.message}</small>}
        </form>
      </div>
    </>
  )
}

export default UpdateAppForm