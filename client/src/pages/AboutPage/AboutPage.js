import { useContext } from "react"
import { useForm } from "react-hook-form"
import { ColoredH1 } from "../../components/ColorSchemeWrapper/ColorSchemeModule"
import ColorSchemeWrapper from "../../components/ColorSchemeWrapper/ColorSchemeWrapper"
import SiteHomepageContext from "../../contexts/homepageContext/HomepageContext"
import "./AboutPage.css"

const AboutPage = () => {
  useContext(SiteHomepageContext).setDisplayedFalse()
  const { register, formState: { errors }, handleSubmit } = useForm({})

  // return (
  //   <div className="About-page">
  //     <ColoredH1>About Page</ColoredH1>
  //   </div>
  // )

  return (
    <ColorSchemeWrapper 
      tag="form"
      action="/api/user/google-drive-upload"
      method="post"
      encType="multipart/form-data"
      style={{color:"_color3", backgroundColor: "_color5"}}
    >
      <label htmlFor="file">file here</label>
      <input id="file" name="file" type="file" {...register("file")}/>
      <br />
      <input type= "submit" value="submit me"/>
    </ColorSchemeWrapper>
  )
}

export default AboutPage
