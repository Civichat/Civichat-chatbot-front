import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import HeadMeta from "../../organisms/HeadMeta";
import PrivacyPolicy from "../../organisms/PrivacyPolicy";
import { useState, useEffect } from "react";
import { GA_TRACKING_ID, setUserId } from '../../src/lib/gtag';

type Props = {
  service_id: string;
  name: string;
  overview: string | null;
  area: string | null;
  amount: string | null;
  target: string | null;
  detail_url: string | null;
  organization: string | null;
  acceptableDates: string | null;
  acceptableTimes: string | null;
  needs: string | null;
  qualification: string | null;
  applyUrl: string | null;
  lastUpdated: string | null;
  image_url: string;
  postal_address: string | null;
  abstract: string | null;
  issue_type: string | null;
  support_content: string | null;
  administrative_service_category: string | null;
  type_nursery_school: string | null;
  target_age: string | null;
  location: string | null;
  closed_days: string | null;
  playground: string | null;
  ibservation: string | null;
  bringing_your_own_towel: string | null;
  take_out_diapers: string | null;
  extended_hours_childcare: string | null;
  availability_of_childcare_facilities_for_0: string | null;
  availability_of_childcare_facilities_for_1: string | null;
  availability_of_childcare_facilities_for_2: string | null;
  availability_of_childcare_facilities_for_3: string | null;
  availability_of_childcare_facilities_for_4: string | null;
  availability_of_childcare_facilities_for_5: string | null;
  apply: string | null;
  contact: string | null;
  url: string | null;
  thisyear_admission_rate_for_0: string | null;
  thisyear_admission_rate_for_1: string | null;
  thisyear_admission_rate_for_2: string | null;
  thisyear_admission_rate_for_3: string | null;
  thisyear_admission_rate_for_4: string | null;
  thisyear_admission_rate_for_5: string | null;
  thisyear_admission_point_for_0: string | null;
  thisyear_admission_point_for_1: string | null;
  thisyear_admission_point_for_2: string | null;
  thisyear_admission_point_for_3: string | null;
  thisyear_admission_point_for_4: string | null;
  thisyear_admission_point_for_5: string | null;
  lastyear_admission_rate_for_0: string | null;
  lastyear_admission_rate_for_1: string | null;
  lastyear_admission_rate_for_2: string | null;
  lastyear_admission_rate_for_3: string | null;
  lastyear_admission_rate_for_4: string | null;
  lastyear_admission_rate_for_5: string | null;
  lastyear_admission_point_for_0: string | null;
  lastyear_admission_point_for_1: string | null;
  lastyear_admission_point_for_2: string | null;
  lastyear_admission_point_for_3: string | null;
  lastyear_admission_point_for_4: string | null;
  lastyear_admission_point_for_5: string | null;
  ibservation_detail: string | null;
  security: string | null;
  parking: string | null;
  baby_buggy: string | null;
  othersType: string | null;
  hours_childcare: string | null;
  seidoType: string;
  liff: any;
  liffError: any;
  civichat_price: number | null;
};

interface LiModel {
  isList: boolean;
  message: string;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  try {
    // @ts-ignore
    const urlId = context.params.id;
    const res = await fetch(
      `${process.env.APIURL}/info/${urlId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const systemFromId = await res.json();
    const seidoType = systemFromId.service_id.split("-")[0];
    let othersType;
    if (seidoType === "shibuya_preschool") {
      othersType = "園への";
    } else if (
      seidoType === "shibuya_parenting" ||
      seidoType === "kumamoto_earthquake" ||
      seidoType === "japan"
    ) {
      othersType = "";
    } else {
      othersType = "";
    }
    console.log(othersType);
    return {
      props: {
        ...systemFromId,
        othersType: othersType,
        seidoType: seidoType,
      },
      revalidate: 86400,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

const needsTestList = (str: string): LiModel[] => {
  const strList = removeNewLineCode(str).startsWith("・")
    ? str.slice(1).split("・")
    : str.split("・");
  const returnList: LiModel[] = [];
  strList.forEach((str, index) => {
    if (strList.length === index + 1) {
      const last = str.split("※");
      if (last.length === 1) {
        last.forEach((str2) => {
          returnList.push({
            isList: true,
            message: removeNewLineCode(str2),
          });
        });
      } else {
        last.forEach((str2, index2) => {
          returnList.push({
            isList: index2 !== last.length - 1,
            message:
              index2 !== last.length - 1
                ? removeNewLineCode(str2)
                : "※" + removeNewLineCode(str2),
          });
        });
      }
    } else {
      str.split("≪").forEach((str2) => {
        const str3 = str2.split("≫")[0];
        returnList.push({
          isList: str3 === str2,
          message:
            str3 === str2
              ? removeNewLineCode(str3)
              : "≪" + removeNewLineCode(str3) + "»",
        });
      });
    }
  });
  return returnList;
};

const removeNewLineCode = (content: string | null): string => {
  if (content) {
    return content.replace(/\\n/g, "");
  }
  return "";
};

const sendReq = async (userId: string, serviceId: string) => {
  // @ts-ignore
  document.getElementById('payment_button').innerText = '処理中...';

  fetch(process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL+'/pay/create', {
    method: "POST",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      serviceId: serviceId,
      userId: userId
    })
  })
  .then(response => {
    if(response.status === 200){
      return response.json()
    }else{
      console.warn('Something went wrong on api server!');
      return response
    }
  })
  .then(json => {
    location.href=process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL+'/pay/reserve?orderId='+json.orderId
  })
}

const systemFromId: NextPage<Props> = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userId, setUserId] = useState('');
  const { liff, liffError } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function line() {
      console.log(props)
      if(props.liff){
        console.log("liff.ready");
        const user = await liff.getProfile();
        setUserId(user.userId);
        if(GA_TRACKING_ID) setUserId(user.userId);
      }
    }
    line();
  }, [liff, props, props.liff]);
  return (
    <div className="px-5 mt-10 items-center">
      <HeadMeta
        path={`info/${props.service_id}`}
        title={props.name}
        description={props.overview ? props.overview : ""}
        isTop={false}
      />
      <img
        style={{ flexBasis: "40%", width: "40%" }}
        className="mx-auto"
        src={props.image_url}
        alt="hero"
      />
      {props.name ? (
        <h1 className="text-4xl font-bold py-4 mt-4">{props.name}</h1>
      ) : undefined}
      {props.abstract !== undefined ? (
        <p className="py-2">{props.abstract}</p>
      ) : undefined}
      <table className="py-2 border-collapse">
        {/* {props.target !== undefined ? (
        // 一旦ここ非表示
          <tr>
            <td className="text-gray-500 w-2/5 py-2">対象者</td>
            <td className=" ">{props.target}</td>
          </tr>
        ) : undefined} */}
        {props.amount !== undefined ? (
          <tr>
            <td className="text-gray-500 w-2/5 py-2">支援額（想定）</td>
            <td className=" ">{props.amount}</td>
          </tr>
        ) : undefined}
        {props.issue_type !== undefined ? (
          <tr>
            <td className="text-gray-500 w-35 py-2">カテゴリー</td>
            <td className="py-2">{props.issue_type}</td>
          </tr>
        ) : undefined}
        {props.support_content !== undefined ? (
          <tr>
            <td className="text-gray-500 w-35 py-2">支援内容</td>
            <td className="py-2">{props.support_content}</td>
          </tr>
        ) : undefined}
        {props.administrative_service_category !== undefined ? (
          <tr>
            <td className="text-gray-500 w-35 py-2">カテゴリー</td>
            <td className="py-2">{props.administrative_service_category}</td>
          </tr>
        ) : undefined}
        {props.type_nursery_school !== undefined ? (
          <tr>
            <td className="text-gray-500 w-2/5 py-2">施設のカテゴリ</td>
            <td className="py-2">{props.type_nursery_school}</td>
          </tr>
        ) : undefined}
        {props.target_age !== undefined ? (
          <tr>
            <td className="text-gray-500 w-35 py-2">対象年齢</td>
            <td className="py-2">{props.target_age}歳</td>
          </tr>
        ) : undefined}
        {props.location !== undefined ? (
          <tr>
            <td className="text-gray-500 w-35 py-2">住所</td>
            <td className="py-2">{props.location}</td>
          </tr>
        ) : undefined}
      </table>

      {props.overview ? <p className="mt-9">{props.overview}</p> : undefined}
      {/*
      <p className="mt-9 text-red-600 font-bold">このページは実証実験用のものです。</p>
      <table className="py-2 border-collapse">
        <tr>
          <td className="text-gray-500 w-20 py-2">対象者</td>
          <td className="py-2">{props.target}</td>
        </tr>
        {props.supportContent ? (
          <tr>
            <td className="text-gray-500 w-20 py-2">支援内容</td>
            <td className="py-2">{props.supportContent}</td>
          </tr>
        ) : undefined}
      </table>
      */}
      {props.needs ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">必要なもの</h2>
          <ul className="my-2 mb-5">
            {needsTestList(props.needs).map((need) => (
              <li
                key={need.message}
                className={need.isList ? "list-disc ml-5" : undefined}
              >
                {need.message}
              </li>
            ))}
          </ul>
        </div>
      ) : undefined}

      {props.postal_address ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">申請窓口</h2>
          <p className="my-2 mb-5">{props.postal_address}</p>
        </div>
      ) : undefined}

      {props.closed_days ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">休園日</h2>
          <p className="my-2 mb-5">{props.closed_days}</p>
        </div>
      ) : undefined}
      {props.playground ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">園庭</h2>
          <p className="my-2 mb-5">{props.playground}</p>
        </div>
      ) : undefined}

      {props.ibservation ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">見学</h2>
          <p className="my-2 mb-5">{props.ibservation}</p>
          <p className="my-2 mb-5">{props.ibservation_detail}</p>
        </div>
      ) : undefined}

      {props.bringing_your_own_towel ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">お昼寝用バスタオルの持ち込み</h2>
          <p className="my-2 mb-5">{props.bringing_your_own_towel}</p>
        </div>
      ) : undefined}

      {props.take_out_diapers ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">おむつの持ち帰り</h2>
          <p className="my-2 mb-5">{props.take_out_diapers}</p>
        </div>
      ) : undefined}

      {props.hours_childcare ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">通常保育の対応時間</h2>
          <p className="my-2 mb-5">{props.hours_childcare}</p>
        </div>
      ) : undefined}

      {props.extended_hours_childcare ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">延長保育の対応時間</h2>
          <p className="my-2 mb-5">{props.extended_hours_childcare}</p>
        </div>
      ) : undefined}

      {props.security ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">施設のセキュリティ</h2>
          <p className="my-2 mb-5">{props.security}</p>
        </div>
      ) : undefined}

      {props.parking ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">駐輪場</h2>
          <p className="my-2 mb-5">{props.parking}</p>
        </div>
      ) : undefined}

      {props.baby_buggy ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">バギー置き場</h2>
          <p className="my-2 mb-5">{props.baby_buggy}</p>
        </div>
      ) : undefined}

      {props.availability_of_childcare_facilities_for_0 ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold py-2">保育施設の空き状況</h2>
          <h4>令和4年5月1日入園分</h4>
          <table className="py-2 border-collapse">
            <tr>
              <td className="text-gray-500 w-60 py-2 w-60">0歳児</td>
              <td className="text-right">
                {props.availability_of_childcare_facilities_for_0}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500 w-60 py-2">1歳児</td>
              <td className="text-right">
                {props.availability_of_childcare_facilities_for_1}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500 w-60 py-2">2歳児</td>
              <td className="text-right">
                {props.availability_of_childcare_facilities_for_2}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500 w-60 py-2">3歳児</td>
              <td className="text-right">
                {props.availability_of_childcare_facilities_for_3}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500 w-60 py-2">4歳児</td>
              <td className="text-right">
                {props.availability_of_childcare_facilities_for_4}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500 w-60 py-2">5歳児</td>
              <td className="text-right">
                {props.availability_of_childcare_facilities_for_5}
              </td>
            </tr>
          </table>
        </div>
      ) : undefined}

      {props.thisyear_admission_rate_for_0 ||
      props.thisyear_admission_rate_for_1 ||
      props.thisyear_admission_rate_for_2 ||
      props.thisyear_admission_rate_for_3 ||
      props.thisyear_admission_rate_for_4 ||
      props.thisyear_admission_rate_for_5 ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold py-2">直近の申込状況</h2>
          <h3>令和4年度(倍率/最下指数)</h3>
          <table className="py-2 border-collapse">
            <tr>
              <td className="text-gray-500 w-40 py-2">0歳児</td>
              <td className="text-right">
                {props.thisyear_admission_rate_for_0 ? (
                  <span>{props.thisyear_admission_rate_for_0}</span>
                ) : (
                  <span>-</span>
                )}
                /
                {props.thisyear_admission_point_for_0 ? (
                  <span>{props.thisyear_admission_point_for_0}</span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500  w-40 py-2">1歳児</td>
              <td className="text-right">
                {props.thisyear_admission_rate_for_1 ? (
                  <span>{props.thisyear_admission_rate_for_1}</span>
                ) : (
                  <span>-</span>
                )}
                /
                {props.thisyear_admission_point_for_1 ? (
                  <span>{props.thisyear_admission_point_for_1}</span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500  w-40 py-2">2歳児</td>
              <td className="text-right">
                {props.thisyear_admission_rate_for_2 ? (
                  <span>{props.thisyear_admission_rate_for_2}</span>
                ) : (
                  <span>-</span>
                )}
                /
                {props.thisyear_admission_point_for_2 ? (
                  <span>{props.thisyear_admission_point_for_2}</span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500  w-40 py-2">3歳児</td>
              <td className="text-right">
                {props.thisyear_admission_rate_for_3 ? (
                  <span>{props.thisyear_admission_rate_for_3}</span>
                ) : (
                  <span>-</span>
                )}
                /
                {props.thisyear_admission_point_for_3 ? (
                  <span>{props.thisyear_admission_point_for_3}</span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500  w-40 py-2">4歳児</td>
              <td className="text-right">
                {props.thisyear_admission_rate_for_4 ? (
                  <span>{props.thisyear_admission_rate_for_4}</span>
                ) : (
                  <span>-</span>
                )}
                /
                {props.thisyear_admission_point_for_4 ? (
                  <span>{props.thisyear_admission_point_for_4}</span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500  w-40 py-2">5歳児</td>
              <td className="text-right">
                {props.thisyear_admission_rate_for_5 ? (
                  <span>{props.thisyear_admission_rate_for_5}</span>
                ) : (
                  <span>-</span>
                )}
                /
                {props.thisyear_admission_point_for_5 ? (
                  <span>{props.thisyear_admission_point_for_5}</span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
          </table>
          <h3>令和3年度(倍率/最下指数)</h3>
          <table className="py-2 border-collapse">
            <tr>
              <td className="text-gray-500 w-40 py-2">0歳児</td>
              <td className="text-right">
                {props.lastyear_admission_rate_for_0 ? (
                  <span>{props.lastyear_admission_rate_for_0}</span>
                ) : (
                  <span>-</span>
                )}
                /
                {props.lastyear_admission_point_for_0 ? (
                  <span>{props.lastyear_admission_point_for_0}</span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500 w-40 py-2">1歳児</td>
              <td className="text-right">
                {props.lastyear_admission_rate_for_1 ? (
                  <span>{props.lastyear_admission_rate_for_1}</span>
                ) : (
                  <span>-</span>
                )}
                /
                {props.lastyear_admission_point_for_1 ? (
                  <span>{props.lastyear_admission_point_for_1}</span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500 w-40 py-2">2歳児</td>
              <td className="text-right">
                {props.lastyear_admission_rate_for_2 ? (
                  <span>{props.lastyear_admission_rate_for_2}</span>
                ) : (
                  <span>-</span>
                )}
                /
                {props.lastyear_admission_point_for_2 ? (
                  <span>{props.lastyear_admission_point_for_2}</span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500 w-40 py-2">3歳児</td>
              <td className="text-right">
                {props.lastyear_admission_rate_for_3 ? (
                  <span>{props.lastyear_admission_rate_for_3}</span>
                ) : (
                  <span>-</span>
                )}
                /
                {props.lastyear_admission_point_for_3 ? (
                  <span>{props.lastyear_admission_point_for_3}</span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500 w-40 py-2">4歳児</td>
              <td className="text-right">
                {props.lastyear_admission_rate_for_4 ? (
                  <span>{props.lastyear_admission_rate_for_4}</span>
                ) : (
                  <span>-</span>
                )}
                /
                {props.lastyear_admission_point_for_4 ? (
                  <span>{props.lastyear_admission_point_for_4}</span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-gray-500 w-40 py-2">5歳児</td>
              <td className="text-right">
                {props.lastyear_admission_rate_for_5 ? (
                  <span>{props.lastyear_admission_rate_for_5}</span>
                ) : (
                  <span>-</span>
                )}
                /
                {props.lastyear_admission_point_for_5 ? (
                  <span>{props.lastyear_admission_point_for_5}</span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
          </table>
        </div>
      ) : undefined}

      {props.apply ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">申込受付先</h2>
          <p className="my-2 mb-5">{props.apply}</p>
        </div>
      ) : undefined}

      
      {props.target !== undefined ? (
        // 以下を一旦追加
        <div>
          <h2 className="mt-3 text-2xl font-bold">
            {props.othersType}対象者
          </h2>
          {props.seidoType === "shibuya_preschool" ? (
            // <a href={`tel:${props.contact}`}>
              <td className="py-2">{props.target}</td>
            // </a>
          ) : (
            props.seidoType === "kumamoto_earthquake") ? (
              <td className="py-2">{props.target}</td>
            ) : (
              <td className="py-2">{props.target?.replace(/(https?|http?)(:\/\/[-_\.!~*\'()a-zA-Z0-9;\/?:\@&=\+\$,%#]+)/, '')}</td>
            )
          }
        </div>
      ) : undefined}

      {props.contact ? (
        <div>
          <h2 className="mt-3 text-2xl font-bold">
            {props.othersType}お問い合わせ
          </h2>
          {props.seidoType === "shibuya_preschool" ? (
            <a href={`tel:${props.contact}`}>
              <td className="py-2">{props.contact}</td>
            </a>
          ) : (
            props.seidoType === "kumamoto_earthquake") ? (
              <td className="py-2">{props.contact}</td>
            ) : (
              <td className="py-2">{props.contact?.replace(/(https?|http?)(:\/\/[-_\.!~*\'()a-zA-Z0-9;\/?:\@&=\+\$,%#]+)/, '')}</td>
            )
          }
        </div>
      ) : undefined}

      {/*props.endReleaseDate ? (
        <div>
          <h2 className="text-2xl font-bold">申請期限</h2>
          <p className="my-2 mb-5">
            {props.endReleaseDate &&
            props.endReleaseDate !== '-' &&
            Number.isInteger(props.endReleaseDate)
              ? unixToDateString(props.endReleaseDate as number)
              : ''}
          </p>
        </div>
      ) : undefined}
      {props.counter && props.counter !== '-' ? (
        <div>
          <h2 className="text-2xl font-bold">申請窓口</h2>
          <ul className="my-2 mb-5">
            {counterList(props.counter).map((counter) => (
              <li key={counter.message} className={counter.isList ? 'list-disc ml-5' : undefined}>
                {counter.message}
              </li>
            ))}
          </ul>
        </div>
      ) : undefined */}
      {(props.acceptableDates || props.acceptableTimes) &&
      (props.acceptableDates !== "-" || props.acceptableTimes !== "-") ? (
        <div>
          <h2 className="text-2xl font-bold">受付可能日時</h2>
          <p className="my-2 mb-5">
            {props.acceptableDates} {props.acceptableTimes}
          </p>
        </div>
      ) : undefined}
      {/*props.contact && props.contact !== '-' ? (
        <div>
          <h2 className="text-2xl font-bold">お問い合わせ先</h2>
          <p className="my-2 mb-5">{props.contact}</p>
        </div>
      ) : undefined */}

      {props.detail_url !== undefined && props.location !== undefined ? (
        <div className="flex flex-row pt-20">
          <div className="w-1/2 px-2">
            {props.detail_url ? (
              <a href={props.detail_url}>
                <button className="container bg-blue-500 font-semibold text-white py-2 px-4 border border-br-500 hover:border-transparent rounded btn-block pt-4 pb-4 mb-5 shadow">
                  ホームページ
                </button>
              </a>
            ) : undefined}
          </div>
          <div className="w-1/2 px-2">
            {props.location ? (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${props.location}`}
              >
                <button className="container bg-green-500 font-semibold text-white py-2 px-4 border border-br-500 hover:border-transparent rounded btn-block pt-4 pb-4 mb-5 shadow">
                  場所を見る
                </button>
              </a>
            ) : undefined}
          </div>
        </div>
      ) : (
        <div className="flex flex-row pt-20">
          <div className="w-full px-2">
            {props.detail_url ? (
              <a href={props.detail_url}>
                <button className="container bg-blue-500 font-semibold text-white py-2 px-4 border border-br-500 hover:border-transparent rounded btn-block pt-4 pb-4 mb-5 shadow">
                  ホームページ
                </button>
              </a>
            ) : undefined}
          </div>
        </div>
      )}
      {props.seidoType === "shibuya_parenting" && props.civichat_price !== null ? (
        <div className="w-full px-2">
          <button type="button"
            className="container bg-green-500 font-semibold text-white mb-10 py-2 px-4 border border-br-500 hover:border-transparent rounded btn-block pt-4 pb-4 shadow"
            data-bs-toggle="modal" data-bs-target="#exampleModalScrollable">
            申請サポートを申し込む(有料)
          </button>

          <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModalScrollable" tabIndex={-1} aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">申請サポートについて</h5>
                  <button type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body relative p-4">
                  <div className="inline-flex flex-col space-y-6 items-center justify-start pt-7 bg-white">
                    <div className="flex flex-col space-y-6 items-start justify-start">
                      <p className="w-full h-20 text-4xl font-bold">制度の申請に必要な書類入力をサポート</p>
                      <p className="w-full text-lg">Googleフォームに情報を入力することで、専用のロボットがお客様に代わって書類を記述します。<br/>お申込みいただくと、申請サポートキットがお手元に届き、申請が最短10分で完了します。</p>
                    </div>
                    <img src="/daiko1.png" alt=""/>
                    <img src="/daiko2.png" alt=""/>
                    <img src="/daiko3.png" alt=""/>
                    {/*<div className="flex flex-col space-y-4 items-start justify-start w-80">
                      <div className="flex flex-col space-y-1.5 items-center justify-end w-full h-16">
                        <p className="w-5/6 text-xl font-bold">記入済みの申請用紙</p>
                        <p className="w-full text-sm">フォームに入力した申請内容は全て印字されているので、そのまま申請可能です</p>
                      </div>
                      <div className="flex flex-col space-y-1.5 items-center justify-end w-full h-16">
                        <p className="w-5/6 text-xl font-bold">申請サポートキット</p>
                        <p className="w-full text-sm">Civichatの「申請サポート」機能を利用する一連の流れをパンフレットでご紹介</p>
                      </div>
                      <div className="flex flex-col space-y-1.5 items-center justify-end w-full h-16">
                        <p className="w-5/6 text-xl font-bold">送信用封筒</p>
                        <p className="w-full text-sm">宛先等が既に記入された送信用の封筒を同封します。80円切手が既に貼られているので、切手を買う手間も削減できます。</p>
                      </div>
                    </div>*/}
                    <p className="text-4xl font-bold">対応制度</p>
                    <img src="/daiko4.png" alt=""/>
                    <img src="/daiko5.png" alt=""/>
                    {/*<div className="inline-flex flex-col space-y-5 items-start justify-start">
                      <div className="w-full h-60">
                        <div className="inline-flex flex-col space-y-7 items-center justify-end flex-1 h-full px-6 pt-11 pb-6 bg-white border rounded-2xl border-black">
                          <div className="flex flex-col space-y-5 items-center justify-end w-full h-24">
                            <p className="w-full text-xl font-bold">ハッピーマザー出産助成金</p>
                            <p className="w-full text-base">出産時の経済的負担の軽減を図り、安心して出産ができるよう、出産した人にハッピーマザー出産助成金を支給します。</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-60">
                        <div className="inline-flex flex-col space-y-7 items-center justify-end flex-1 h-full px-6 pt-11 pb-8 bg-white border rounded-2xl border-black">
                          <div className="flex flex-col space-y-7 items-center justify-end w-full h-20">
                            <p className="w-full text-xl font-bold">児童手当</p>
                            <p className="w-full text-base">子育て世帯に対して、養育されている子どものために支給される手当です。</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-1/3">
                        <div className="inline-flex flex-col space-y-7 items-center justify-end flex-1 h-full px-6 pt-11 pb-5 bg-white border rounded-2xl border-black">
                          <div className="flex flex-col space-y-5 items-center justify-end w-full h-32">
                            <p className="w-full text-xl font-bold">病児・病後児保育利用料金助成</p>
                            <p className="w-full text-base">お子さんが病気やケガで保育施設に登園できない場合、仕事があるなどの理由で、ご自宅でベビーシッターなどのサービスを利用した時に、その料金の一部を区が助成する制度です。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-48">
                      <div className="flex items-start justify-center flex-1 h-full px-3 pt-7 pb-9 bg-primary">
                        <div className="inline-flex flex-col space-y-6 items-start justify-start">
                          <p className="text-3xl font-bold text-white">利用料金</p>
                          <p className="w-full text-xl text-white">「申請サポート」プラン 500円(税込)</p>
                          <p className="w-full text-base text-white">※80円切手代込み</p>
                        </div>
                      </div>
                    </div>*/}
                  </div>
                  <PrivacyPolicy />
                </div>

                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <p>決済完了後表示されるGoogleフォームにて情報の入力をお願いいたします。(ログインが求められる場合がございます。)</p>
                  <button type="button"
                    className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-dismiss="modal">
                    戻る
                  </button>
                  <button onClick={async () => {
                    sendReq(userId, props.service_id);
                  } } className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    id="payment_button">
                    確認しました
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : undefined}

      {props.othersType === "園への" ? (
        <div>
          <p className="border-t-2 mt-4"></p>
          <div className="px-2 mb-5 pt-6">
            <h5 className="font-bold text-gray-500">
              記載しているデータについて
            </h5>
            <p className="text-gray-500 text-sm">
              株式会社Civichatが独自に収集したデータのほか、渋谷区議会神薗まちこ議員が独自調査の結果、公開しているデータを承諾の上、利用しています。
            </p>
            <a
              href="https://docs.google.com/spreadsheets/d/19jDzX0feJ8-SzVEn3VEwe5OF348dsnDU0zzss9CrlZ4"
              rel="noopener noreferrer"
            >
              <p className="text-gray-500 text-sm underline">
                渋谷区保育園2021_一覧表
              </p>
            </a>
          </div>
        </div>
      ) : undefined}
    </div>
  );
};
export default systemFromId;
