vercel env ls | awk '{print $1}' | tail -n +2 | xargs -I {} vercel env rm {} -y
