# !/bin/bash
IPA_NAME="$1"
PROVISIONING_FILE="$2"
CERT_NAME="$3"

RESIGNED_IPA_NAME="resigned_"$IPA_NAME
ORI_PROVISIONING_PATH="./"$IPA_NAME"/"$PROVISIONING_FILE".mobileprovision"
NEW_PROVISIONING_PATH="./"$IPA_NAME"/embedded.mobileprovision"

echo $IPA_NAME
echo $RESIGNED_IPA_NAME
echo $CERT_NAME

echo $PROVISIONING_FILE
echo $ORI_PROVISIONING_PATH
echo $NEW_PROVISIONING_PATH

IPA_PATH="./"$IPA_NAME"/"$IPA_NAME".ipa"
RESIGNED_IPA_PATH="./"$IPA_NAME"/"$RESIGNED_IPA_NAME".ipa"
echo $IPA_PATH
echo $RESIGNED_IPA_PATH

# provisioning 改名
cp $ORI_PROVISIONING_PATH $NEW_PROVISIONING_PATH

./ios_resign_with_ipa $IPA_PATH "$CERT_NAME" $NEW_PROVISIONING_PATH $RESIGNED_IPA_PATH

/Applications/AppDeploy.app/Contents/MacOS/AppDeploy --file=$RESIGNED_IPA_PATH --serverkey=$IPA_NAME --ftp

rm -rf $ORI_PROVISIONING_PATH