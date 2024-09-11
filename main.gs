/***********
 * 定数宣言
 ***********/
const ID = {
  DOC_TEMPLATE: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // 欠席届テンプレート
  PDF_OUTDIR: 'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY'               // PDF保存先フォルダ
}

// 以下メソッドを送信トリガーに設定
function gasGoogleForm2GoogleDocument(e) {
  /************************************************************************
   * １．欠席届テンプレートをコピーし、編集用ファイルを作成する。
   ************************************************************************/
  const copyFile = DriveApp.getFileById(ID.DOC_TEMPLATE).makeCopy(),
        copyFileId = copyFile.getId(),
        copyDocument = DocumentApp.openById(copyFileId);
  let docBody = copyDocument.getBody();


  /************************************************************************
   * ２．Googleフォームの回答データを取得する。
   ************************************************************************/
  let itemResponses;
  if (e !== undefined) {
    itemResponses = e.response.getItemResponses();
  } else {
    const fResponses = FormApp.getActiveForm().getResponses();
    itemResponses =  fResponses[fResponses.length-1].getItemResponses();
  }


  /************************************************************************
   * ３．回答データを項目ごと（氏名、欠席日等）に取得し、欠席届の対象箇所にマッピングする。
   ************************************************************************/
  itemResponses.forEach(function(itemResponse){
    switch (itemResponse.getItem().getTitle()) {
      case '氏名を入力してください':
        docBody = docBody.replaceText(`{{name}}`, itemResponse.getResponse());
        break;

      case '欠席日を入力してください':
        docBody = docBody.replaceText(`{{absense_date}}`, dayjs.dayjs(itemResponse.getResponse()).format('YYYY年MM月DD日'));
        break;

      case '欠席理由を選択してください':
        docBody = docBody.replaceText(`{{reason}}`, itemResponse.getResponse());
        break;

      default:
        break;
    }
  });
  // 届け出日には現在日時を設定
  docBody = docBody.replaceText(`{{date}}`, dayjs.dayjs().format('YYYY年MM月DD日'));
  copyDocument.saveAndClose();

 
  /************************************************************************
   * ４．３．で作成した編集用ファイルをPDF変換する。
   ************************************************************************/
  // PDF変換するためのベースURLと必要なオプションを作成
  let baseUrl = `https://docs.google.com/document/d/${copyFileId}/export?exportFormat=pdf`,
      options = {
        headers: {
          'Authorization': `Bearer ${ScriptApp.getOAuthToken()}`
        }
      },
      pdfBlob = UrlFetchApp.fetch(baseUrl, options).getBlob().setName(`欠席届_${dayjs.dayjs().format('YYYY年MM月DD日HH時mm分ss秒')}.pdf`),
      pdfFile = DriveApp.getFolderById(ID.PDF_OUTDIR).createFile(pdfBlob);
  // pdfファイルができたら元データ（Googleドキュメント）は削除
  copyFile.setTrashed(true);


  /************************************************************************
   * ５．４．で作成したPDFファイルをメール送信する。
   ************************************************************************/
  // PDFファイルを添付してメールを送信する
  GmailApp.sendEmail(
    'test@test.com',  // 送信先メールアドレスを指定
    '【自動送信メール】欠席届の送信',
    '利用者より欠席届が送信されました。',
    {attachments: DriveApp.getFileById(pdfFile.getId()).getBlob()}
  );
}
