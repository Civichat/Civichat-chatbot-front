import { NextPage } from 'next'
import MDSpinner from "react-md-spinner";
import LoadingStyle from "../styles/Loading.module.scss"

const Index: NextPage = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className={LoadingStyle.loading} />
    </div>
  )
}

export default Index
