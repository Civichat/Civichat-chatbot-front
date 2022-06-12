// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

// PV 測定
export const pageview = (url: string): void => {
  // GA_TRACKING_ID が設定されていない場合は、処理終了
  if (!GA_TRACKING_ID) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// User ID 設定
export const setUserId = (userId: string): void => {
  // GA_TRACKING_ID が設定されていない場合は、処理終了
  if (!GA_TRACKING_ID || !userId) return;
  window.gtag('config', GA_TRACKING_ID, {
    user_id: userId
  });
};