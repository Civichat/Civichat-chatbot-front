import { FC } from 'react'

const PrivacyPolicy: FC = () => (
  <div className="columns">
    <div className="columns__main">
      <div className="privacy">
        <h1 className="privacy__title">Civichatプライバシーポリシー</h1>
        <p className="privacy__textual">Civichatがお客様のプライバシーを保護する概要についてお伝えします
        </p>
        {/* privacy content blocks start */}
        <div className="privacy__item" id="privacy-2">
          <div className="privacy__item-block">
            <h2 className="privacy__item-title"><span className="privacy__item-icon">
                <svg className="icon icon-datacollection">
                  <use href="/sprite.svg#icon-datacollection"></use>
                </svg>
              </span>いつ・どのように、私たちがデータを集めるか</h2>
            <div className="privacy__item-i">
              <p>お客様が初めてCivichatに触れた瞬間から、私たちはデータを収集しています。時にはお客様がデータを入力する場合もあれば、お客様に関するデータが自動的に収集される場合もあります。
              </p>
              <div className="data-scheme">
                <div className="data-scheme__top">
                  <div className="data-scheme__top-left"> <svg className="icon icon-data-you">
                      <use href="/sprite.svg#icon-data-you"></use>
                    </svg>
                    <p>あなたが入力するデータ</p>
                  </div>
                  <div className="data-scheme__top-right"> <svg className="icon icon-data-we">
                      <use href="/sprite.svg#icon-data-we"></use>
                    </svg>
                    <p>Civichatが集めるデータ</p>
                  </div>
                </div>
                <div className="data-scheme__wrap">
                  <div className="data-scheme__list">
                    <p className="data-scheme__item bull-blue">Webサイトを閲覧した時
                    </p>
                    <p className="data-scheme__item bull-blue bull-green">Civichatを使っている時
                    </p>
                    <p className="data-scheme__item bull-green bull-blue">カスタマーサポートを行っている最中</p>
                    <p className="data-scheme__item bull-blue">メッセージを送信するとき</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="privacy__item" id="privacy-3">
          {/* toggler content */}<input type="checkbox" className="act-checker" id="act-togle-2" />
          <div className="privacy__item-block act-smooth">
            <h2 className="privacy__item-title"><span className="privacy__item-icon">
                <svg className="icon icon-datatypes">
                  <use href="/sprite.svg#icon-datatypes"></use>
                </svg>
              </span>当社が集めるデータの種類</h2>
            <div className="privacy__item-i">
              <div className="data-collect">
                <div className="data-collect__item"> <span className="data-collect__item-icon">
                    <svg className="icon icon-payments">
                      <use href="/sprite.svg#icon-payments"></use>
                    </svg>
                  </span>
                  <div>
                    <h3 className="data-collect__title"> 制度推薦に必要なデータ </h3>
                    <p>制度を推薦するために、質問で答えた世帯構成や他の制度の利用状況などを利用することがあります。</p>
                  </div>
                </div>
                <div className="data-collect__item"> <span className="data-collect__item-icon">
                    <svg className="icon icon-contractdata">
                      <use href="/sprite.svg#icon-contractdata"></use>
                    </svg>
                  </span>
                  <div>
                    <h3 className="data-collect__title">「申請サポート」に必要なデータ</h3>
                    <p>
                      制度の申請書類を生成するにあたり、ロボットがあなたの入力した情報を利用します。これは、名前や住所、世帯情報などが含まれる場合があります。
                    </p>
                  </div>
                </div>
                <div className="data-collect__item"> <span className="data-collect__item-icon">
                    <svg className="icon icon-IDdata">
                      <use href="/sprite.svg#icon-IDdata"></use>
                    </svg>
                  </span>
                  <div>
                    <h3 className="data-collect__title">あなたを識別するデータ</h3>
                    <p>IPアドレスやログイン情報、ブラウザの種類など、サービスを改善するために参考にする場合があります。
                    </p>
                  </div>
                </div>
                <div className="data-collect__item"> <span className="data-collect__item-icon">
                    <svg className="icon icon-usage">
                      <use href="/sprite.svg#icon-usage"></use>
                    </svg>
                  </span>
                  <div>
                    <h3 className="data-collect__title">Civichatの使い方に関するデータ</h3>
                    <p> どのような流れでHPに訪れたのかや、起こったエラー、ページを閲覧する回数などを参考にする場合があります。 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="privacy__item-block act-slide">
            <div className="privacy__item-i">
              <div className="data-collect">
                <div className="data-collect__item"> <span className="data-collect__item-icon">
                    <svg className="icon icon-sensitivedata">
                      <use href="/sprite.svg#icon-sensitivedata"></use>
                    </svg>
                  </span>
                </div>
                <div className="data-collect__item"> <span className="data-collect__item-icon">
                    <svg className="icon icon-childrendata">
                      <use href="/sprite.svg#icon-childrendata"></use>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="privacy__item" id="privacy-4">
          {/* toggler content */}<input type="checkbox" className="act-checker" id="act-togle-4" />
          <div className="privacy__item-block act-smooth">
            <h2 className="privacy__item-title"> <span className="privacy__item-icon">
                <svg className="icon icon-datause">
                  <use href="/sprite.svg#icon-datause"></use>
                </svg>
              </span>Civichatはデータを活用します</h2>
            <div className="privacy__item-i">
              <p>入力されたデータは、以下の機能を提供するためだけに使用します:</p>
              <div className="data-collect">
                <div className="data-collect__item">
                  <div>
                    <h3 className="data-collect__title">Civichatの機能である推薦・申請サポート機能を提供するため</h3>
                    <p>
                      公共制度の推薦のほか、申請サポート機能を提供するために入力されたデータを使用します。
                    </p>
                    <p className="data-collect__tags">利用目的: <span className="js-tags"
                        data-anchor="tag-contract">制度の推薦</span><span className="js-tags"
                        data-anchor="tag-legitimate">申請サポート</span></p>
                  </div>
                </div>
                <div className="data-collect__item">
                  <div>
                    <h3 className="data-collect__title">個人へのカスタマーサポートを実施するため</h3>
                    <p>トラブルが起こった際に1:1のカスタマーサポートを実施するために、入力した情報を取得しています。これにより、入力ミスやバグの発見、訂正などを早期に行うことが可能になります。</p>
                    <p className="data-collect__tags">利用目的: <span className="js-tags"
                        data-anchor="tag-contract">制度の推薦</span><span className="js-tags"
                        data-anchor="tag-legitimate">申請サポート</span></p>
                  </div>
                </div>
                <div className="data-collect__item">
                  <div>
                    <h3 className="data-collect__title">個別のマーケティングメッセージを送信するため</h3>
                    <p>あなたが使える新しい制度が追加された際やお知らせなどを送信します。</p>
                    <p className="data-collect__tags">利用目的: <span className="js-tags"
                        data-anchor="tag-contract">制度追加のお知らせ</span></p>
                  </div>
                </div>
                <div className="data-collect__item">
                  <div>
                    <h3 className="data-collect__title">サービス改善に利用するため
                    </h3>
                    <p>入力されたデータから、ユーザーがもっと使いやすくなるように改善します。</p>
                    <p className="data-collect__tags">利用目的: <span className="js-tags"
                        data-anchor="tag-consent">申請サポート</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="privacy__item" id="privacy-7">
          <div className="privacy__item-block">
            <h2 className="privacy__item-title"> <span className="privacy__item-icon">
                <svg className="icon icon-location">
                  <use href="/sprite.svg#icon-location"></use>
                </svg>
              </span>あなたのデータは以下のシステムに保管されます</h2>
              <div className="privacy__item-i">
              <p>
                Civichatは複数のサービスを活用してその上に作られたサービスであり、Civichatを利用することは以下のサービスに安全な形でデータを共有することになります。
              </p>
              <table className="privacy__table">
                <thead>
                  <tr>
                    <th>サービス提供者</th>
                    <th>扱うデータ</th>
                    <th>目的</th>
                    <th>データ処理を行う場所</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="サービス提供者">
                      <p>Google</p> <a href="https://www.google.com/policies/privacy/">(プライバシーポリシー)</a>
                    </td>
                    <td data-label="扱うデータ">
                      <ul>
                        <li>どのようにしてCivichatを利用しているか</li>
                        <li>あなたを識別できる情報</li>
                        <li>「申請サポート」機能を提供するのに必要な情報</li>
                      </ul>
                    </td>
                    <td data-label="目的">
                      <p>利用状況や活動などを把握するためにGoogleアナリティクスを、申請サポート機能のデータを収集するためにGoogleフォームを利用します。
                      </p>
                    </td>
                    <td data-label="データ処理を行う場所">
                      <p>アメリカ</p>
                    </td>
                  </tr>
                  <tr>
                    <td data-label="サービス提供者">
                      <p>AWS</p> <a href="https://aws.amazon.com/jp/compliance/japan-data-privacy/">(プライバシーポリシー)</a>
                    </td>
                    <td data-label="扱うデータ">
                      <ul>
                        <li>推薦する制度データ</li>
                        <li>制度推薦のための回答データ</li>
                      </ul>
                    </td>
                    <td data-label="目的">
                      <p>インフラストラクチャーとして、Webシステムの根底になるものです。主に制度データを保存し、推薦するためのシステムが動作する場所です。</p>
                    </td>
                    <td data-label="データ処理を行う場所">
                      <p>日本</p>
                    </td>
                  </tr>
                  <tr>
                  <td data-label="サービス提供者">
                    <p>LINE</p> <a href="https://line.me/ja/terms/policy/">(プライバシーポリシー)</a>
                  </td>
                  <td data-label="扱うデータ">
                    <ul>
                      <li>どのようにしてCivichatを利用しているか</li>
                    </ul>
                  </td>
                  <td data-label="目的">
                    <p>制度診断システムを利用するためのインターフェースとしてLINEを利用しています。</p>
                  </td>
                  <td data-label="データ処理を行う場所">
                    <p>日本</p>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="privacy__item" id="privacy-10">
          <div className="privacy__item-block act-smooth">
            <h2 className="privacy__item-title"> <span className="privacy__item-icon">
                <svg className="icon icon-cookies">
                  <use href="/sprite.svg#icon-cookies"></use>
                </svg>
              </span>Cookieを利用しています
            </h2>
            <div className="privacy__item-i">
              <p>当社は、サービスの実行と改善に必要なCookieのみを使用します。そのほか、第三者サービスプロバイダーもCookieを使用しています
                </p>
            </div>
          </div>
        {/* privacy content blocks end */}
      </div>
    </div>
  </div>
)

export default PrivacyPolicy
