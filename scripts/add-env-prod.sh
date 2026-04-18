cat .env | grep -v '^#' | grep -v '^$' | while IFS='=' read -r key value; do
  vercel env add "$key" production <<< "$value"
done
