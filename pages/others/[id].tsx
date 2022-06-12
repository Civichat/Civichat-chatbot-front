import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import HeadMeta from "../../organisms/HeadMeta";
import Link from "next/link";

type System = {
  name: string;
  overview: string | null;
  detailUrl: string | null;
  administrativeServiceCategory: string | null;
  serviceId: string;
  service_id: string | null;
  support_content: string | null;
  target: string | null;
  contact: string | null;
  ibservation: string | null;
  location: string | null;
  administrative_service_category: string | null;
  abstract: string | null;
  issue_type: string | null;
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
};

type Props = {
  resultId: string;
  result: System[];
  othersType: string;
  img_url: string;
  seidoType: string;
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

const changeDetailContent = (content: string | null): string => {
  if (content) {
    return content.replace(/<br>/g, "\n");
  }
  return "";
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  // @ts-ignore
  const urlId = context.params.id;
  const res = await fetch(`${process.env.APIURL}/others?resultId=${urlId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const OtherFromId = await res.json();
  const seidoType = OtherFromId.result[0].service_id.split("-")[0];
  let othersType;
  if (seidoType === "shibuya_preschool") {
    othersType = "施設";
  } else if (
    seidoType === "shibuya_parenting" ||
    seidoType === "kumamoto_earthquake" ||
    seidoType === "japan"
  ) {
    othersType = "制度";
  } else {
    othersType = "";
  }

  if (OtherFromId.result.length) {
    return {
      props: {
        ...OtherFromId,
        othersType: othersType,
        img_url: OtherFromId.img_url,
        seidoType: seidoType,
      },
      revalidate: 3600,
    };
  }
  return {
    notFound: true,
  };
};

const OthersFromId: NextPage<Props> = ({
  result,
  resultId,
  othersType,
  img_url,
  seidoType,
}) => {
  return (
    <div className="container items-center justify-center mx-auto px-2">
      <HeadMeta
        path={`others/${resultId}`}
        title={"結果一覧を見る"}
        description={"Civichat"}
        isTop={false}
      />
      <div>
        <div className="flex justify-center items-center pt-4 pb-4">
          <div style={{ flexBasis: "80%" }} className="p-2">
            <p className="font-black text-2xl px-2">
              あなたにぴったりの{othersType}が合計{result.length}
              個見つかりました！
            </p>
          </div>
          <img
            style={{ flexBasis: "30%", width: "30%" }}
            className="h-full m-5"
            src={img_url}
            width="981"
            height="757"
            alt="タイトル画像"
          />
        </div>
      </div>
      <div>
        <h3 className="text-xl px-5 font-bold text-2xl">
          {othersType !== "" ? `${othersType}一覧` : "一覧"}
        </h3>
        {result.map((system) => (
          <a className="" key={system.service_id}>
            <div className="p-5">
              <h3 className="text-xl font-bold py-4">{system.name}</h3>
              <table className="py-2 border-collapse">
                {system.target !== undefined ? (
                  <tr>
                    <td className="text-gray-500 w-35 py-2">対象者</td>
                    <td className=" ">{system.target}</td>
                  </tr>
                ) : undefined}
                {system.abstract !== undefined ? (
                  <tr>
                    <td className="text-gray-500 w-35 py-2">概要</td>
                    <td className="py-2">{system.abstract}</td>
                  </tr>
                ) : undefined}
                {system.issue_type !== undefined ? (
                  <tr>
                    <td className="text-gray-500 w-35 py-2">カテゴリー</td>
                    <td className="py-2">{system.issue_type}</td>
                  </tr>
                ) : undefined}
                {system.support_content !== undefined ? (
                  <tr>
                    <td className="text-gray-500 w-35 py-2">支援内容</td>
                    <td className="py-2">{system.support_content}</td>
                  </tr>
                ) : undefined}
                {system.administrative_service_category !== undefined ? (
                  <tr>
                    <td className="text-gray-500 w-35 py-2">カテゴリー</td>
                    <td className="py-2">
                      {system.administrative_service_category}
                    </td>
                  </tr>
                ) : undefined}
                {system.location !== undefined ? (
                  <tr>
                    <td className="text-gray-500 w-35 py-2">住所</td>
                    <td className="py-2">{system.location}</td>
                  </tr>
                ) : undefined}
                {system.ibservation !== undefined ? (
                  <tr>
                    <td className="text-gray-500 w-35 py-2">見学</td>
                    <td className="py-2">{system.ibservation}</td>
                  </tr>
                ) : undefined}
                {system.contact !== undefined ? (
                  <tr>
                    <td className="text-gray-500 w-40 py-2">お問い合わせ先</td>
                    {seidoType === "shibuya_preschool" ? (
                      <a href={`tel:${system.contact}`}>
                        <td className="py-2">{system.contact}</td>
                      </a>
                    ) : (
                      seidoType === "kumamoto_earthquake") ? (
                        <td className="py-2">{system.contact}</td>
                      ) : (
                        <td className="py-2">{system.contact?.replace(/(https?|http?)(:\/\/[-_\.!~*\'()a-zA-Z0-9;\/?:\@&=\+\$,%#]+)/, '')}</td>
                      )
                    }
                  </tr>
                ) : undefined}
              </table>

              {system.thisyear_admission_rate_for_0 ||
              system.thisyear_admission_rate_for_1 ||
              system.thisyear_admission_rate_for_2 ||
              system.thisyear_admission_rate_for_3 ||
              system.thisyear_admission_rate_for_4 ||
              system.thisyear_admission_rate_for_5 ? (
                <div>
                  <h3>令和3年度申し込み状況(倍率/最下指数)</h3>
                  <table className="py-2 border-collapse">
                    <tr>
                      <td className="text-gray-500 w-40 py-2">0歳児</td>
                      <td className="text-right">
                        {system.thisyear_admission_rate_for_0 ? (
                          <span>{system.thisyear_admission_rate_for_0}</span>
                        ) : (
                          <span>-</span>
                        )}
                        /
                        {system.thisyear_admission_point_for_0 ? (
                          <span>{system.thisyear_admission_point_for_0}</span>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-500  w-40 py-2">1歳児</td>
                      <td className="text-right">
                        {system.thisyear_admission_rate_for_1 ? (
                          <span>{system.thisyear_admission_rate_for_1}</span>
                        ) : (
                          <span>-</span>
                        )}
                        /
                        {system.thisyear_admission_point_for_1 ? (
                          <span>{system.thisyear_admission_point_for_1}</span>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-500  w-40 py-2">2歳児</td>
                      <td className="text-right">
                        {system.thisyear_admission_rate_for_2 ? (
                          <span>{system.thisyear_admission_rate_for_2}</span>
                        ) : (
                          <span>-</span>
                        )}
                        /
                        {system.thisyear_admission_point_for_2 ? (
                          <span>{system.thisyear_admission_point_for_2}</span>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-500  w-40 py-2">3歳児</td>
                      <td className="text-right">
                        {system.thisyear_admission_rate_for_3 ? (
                          <span>{system.thisyear_admission_rate_for_3}</span>
                        ) : (
                          <span>-</span>
                        )}
                        /
                        {system.thisyear_admission_point_for_3 ? (
                          <span>{system.thisyear_admission_point_for_3}</span>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-500  w-40 py-2">4歳児</td>
                      <td className="text-right">
                        {system.thisyear_admission_rate_for_4 ? (
                          <span>{system.thisyear_admission_rate_for_4}</span>
                        ) : (
                          <span>-</span>
                        )}
                        /
                        {system.thisyear_admission_point_for_4 ? (
                          <span>{system.thisyear_admission_point_for_4}</span>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-500  w-40 py-2">5歳児</td>
                      <td className="text-right">
                        {system.thisyear_admission_rate_for_5 ? (
                          <span>{system.thisyear_admission_rate_for_5}</span>
                        ) : (
                          <span>-</span>
                        )}
                        /
                        {system.thisyear_admission_point_for_5 ? (
                          <span>{system.thisyear_admission_point_for_5}</span>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                  </table>
                </div>
              ) : undefined}

              {system.service_id !== undefined &&
              system.location !== undefined ? (
                <div className="flex flex-row">
                  <div className="w-1/2 px-2">
                    <Link
                      href={`/services/${system.service_id}`}
                      key={system.service_id}
                    >
                      <button className="container hover:bg-blue-500 font-semibold hover:text-white py-2  my-4 px-4 border border-black-500 hover:border-transparent rounded btn-block">
                        詳しく見る
                      </button>
                    </Link>
                  </div>
                  <div className="w-1/2 px-2">
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${system.location}`}
                      key={system.service_id}
                    >
                      <button className="container hover:bg-blue-500 font-semibold hover:text-white py-2  my-4 px-4 border border-black-500 hover:border-transparent rounded btn-block">
                        場所をみる
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row">
                  <div className="w-full px-2">
                    <Link
                      href={`/services/${system.service_id}`}
                      key={system.service_id}
                    >
                      <button className="container hover:bg-blue-500 font-semibold hover:text-white py-2  my-4 px-4 border border-black-500 hover:border-transparent rounded btn-block">
                        詳しく見る
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              <p className="border-t-2 mt-4"></p>
              {/*
              <table className="py-2 border-collapse">
                <tr>
                  <td className="text-gray-500 w-20 py-2"></td>
                  <td className="py-2">{system.target}</td>
                </tr>
                <tr>
                  <td className="text-gray-500 w-20 py-2">支援内容</td>
                  <td className="py-2">{system.supportContent}</td>
                </tr>
              </table>*/}
            </div>
          </a>
        ))}
      </div>

      {othersType === "施設" ? (
        <div className="px-5 mb-5">
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
      ) : undefined}
      {/*systems.slice(systems.length - 9, systems.length).length >= 1 ? (
        <div>
          <h3 className="text-xl p-2 font-bold">相談・窓口に関すること</h3>
          {systems.slice(systems.length - 9, systems.length).map((system) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div
              className="flex border-gray-300 rounded-2xl border my-2.5 justify-center items-center"
              key={system.id}
              onClick={() => {
                Router.push({ pathname: `/info/${system.id}` })
              }}
            >
              <img
                style={{ flexBasis: '33%', width: '33%' }}
                className="h-full m-2"
                src={system.imageUrl}
                width="981"
                height="757"
                alt="test"
              />
              <div style={{ flexBasis: '70%' }} className="p-2">
                <h3 className="text-xl font-bold py-2">{system.name}</h3>
                <h4 className="py-2">{system.overview}</h4>
                <table className="py-2 border-collapse">
                  <tr>
                    <td className="text-gray-500 w-20 py-2">対象者</td>
                    <td className="py-2">{system.target}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 w-20 py-2">支援内容</td>
                    <td className="py-2">{system.supportContent}</td>
                  </tr>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : undefined*/}
    </div>
  );
};

export default OthersFromId;
