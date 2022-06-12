import { NextPage } from 'next'
import MDSpinner from "react-md-spinner";
import LoadingStyle from "../styles/Loading.module.scss"
import {useRouter} from "next/router";

const Data: NextPage = () => {
  const router = useRouter()
  return (
    <div className="container items-center justify-center mx-auto px-2">
      <h1 className="py-2 text-center font-bold text-3xl my-5">データについて</h1>
      <p className="my-2 leading-7">
        このチャットボットは、令和3年7月1日からの大雨による災害により被災された方が利用できる支援制度の情報を、一定の情報の正確性を担保しつつ、被災された方々にできるだけ早くお届けするために作成されました。
      </p>
      <p className="my-2 leading-7">
        掲載されているデータは、株式会社Civichatが調査し、また、株式会社アスコエパートナーズの支援により『熊本県令和2年7月豪雨における被災者支援制度オープンデータ』をもとに構築しているものです。
      </p>
      <p className="my-2 leading-7">
        そのため、すべての検索結果が必ずしも本災害に適用されるとは限りません。
      </p>
      <p className="my-2 leading-7">
        正確な情報は、各カードから確認できる、政府および地方公共団体のホームページをご確認ください。
      </p>
      <p className="my-2 leading-7">
        なお、掲載している制度情報は今後更新されていく予定です。
      </p>
      <div className="flex justify-center p-2">
        <button className="text-center underline" onClick={() => {router.back()}}>戻る</button>
      </div>
    </div>
  )
}

export default Data
