# GoogleForm2GoogleDocument

## プロジェクトについて
Google Apps Scriptを用いて、GoogleフォームとGoolgeドキュメントを連携させ、フォーム回答後に自動でPDFドキュメントを作成する。

## 事前準備
Googleドライブ内に以下のような構成を作成する。
1. outputフォルダ
2. テンプレートとなるドキュメントファイル
3. 回答用のGoogleフォーム  
<img src="http://drive.google.com/uc?export=view&id=1-6cgrSjeYpijg5yWXXzer-B1d2qsGb4a" width="250">

### テンプレートとなるドキュメントファイルのイメージ  
<img src="http://drive.google.com/uc?export=view&id=1IpP1mkRGmTeeTcLJha7qBj7D7sna2j1n" width="550">

### 回答用のGoogleフォームのイメージ  
<img src="http://drive.google.com/uc?export=view&id=1wJpCi3LgeeCL2gwdLx-jOivVq4T0wIR9" width="250">

## 使い方
1. Googleフォームのコンテナバインド型としてGASを開く。  
2. GASにmain.gsの内容をコピーする。
3. エディタのライブラリ追加より、以下のスクリプトIDを入力して、dayjsをインストールする。  
   dayjsスクリプトID：1ShsRhHc8tgPy5wGOzUvgEhOedJUQD53m-gd8lG2MOgs-dXC_aCZn9lFB  
   ※ライブラリ追加の手順は以下イメージ  
     <img src="http://drive.google.com/uc?export=view&id=1pLOIRnsiEMCDeoEnItS4TusVFZ0KorLP" width="400">
4. 5行目：DOC_TEMPLATE、6行目：PDF_OUTDIRおよび79行目：送信先メールアドレスの値を適宜変更する。  
   なお、DOC_TEMPLATEには欠席届テンプレートのドキュメントID、PDF_OUTDIRにはoutputフォルダのフォルダIDを入力する。  
   ※各IDは以下の囲った箇所を参照  
     <img src="http://drive.google.com/uc?export=view&id=1RMc4lofsij2Dy3riH50KMc7zPWXVwbO1" width="500">
5. gasGoogleForm2GoogleDocumentに対して、送信時トリガーを設定する。  

## Googleフォーム回答時
上記使い方のように設定することで、送信先メールアドレスに指定したメールアドレス宛にPDFに変換されたドキュメントファイルが到達する。
