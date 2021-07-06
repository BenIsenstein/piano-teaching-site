import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { ColoredH1 } from "../../components/ColorSchemeWrapper/ColorSchemeModule"
import ColorSchemeWrapper from "../../components/ColorSchemeWrapper/ColorSchemeWrapper"
import SiteHomepageContext from "../../contexts/homepageContext/HomepageContext"
import "./AboutPage.css"

const AboutPage = () => {
  // return (
  //   <div className="About-page">
  //     <ColoredH1>About Page</ColoredH1>
  //   </div>
  // )

  useContext(SiteHomepageContext).setDisplayedFalse()
  const { register, formState: { errors }, handleSubmit } = useForm({})

  const onSubmit = async (data) => {
    let action = "/api/user/google-drive-upload"
    let reqOptions = {
      method: 'post',
      body: new FormData(test)
    }

    try {
      let res = await fetch(action, reqOptions)
      console.log('initial fetch success')
      let resObject = await res.json() 
      console.log('res.json() success')

      if (resObject.success) alert("Success!")
      else alert("success FALSE")
    }
    catch (err) {
      console.log(err)
      alert(`
        There was an issue submitting this info. 
        We're working on it as fast as we can.
      `)
    }
  }

  return (
    <ColorSchemeWrapper 
      tag="form"
      id="test"
      onSubmit={async (data) => await onSubmit(data)}
      style={{ color:"_color1", backgroundColor: "_color5" }}
    >
      <label htmlFor="file">file here</label>
      <input id="file" name="file" type="file" {...register("file", {required: "you must submit a file."})} />
      <br />
      <input type="submit" value="submit me"/>
    </ColorSchemeWrapper>
  )
}

export default AboutPage
