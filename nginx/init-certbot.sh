#!/bin/bash
# Let's Encrypt 证书初始化脚本
set -e

cd /opt/nginx
EMAIL="admin@wuhuhai.com"

# 域名列表: "主域名,别名列表"
DOMAINS=(
    "wuhuhai.com,wuhuhai.com,www.wuhuhai.com,wuhuhai.cn,www.wuhuhai.cn,wuhuahi.com,wuhauhai.cn"
    "gebilaoyi.cn,gebilaoyi.cn,www.gebilaoyi.cn"
    "a60.cn,a60.cn,www.a60.cn"
    "b187.cn,b187.cn,www.b187.cn"
)

echo "=== Step 1: 使用临时 HTTP 配置启动 nginx ==="
cp templates/sites-temp.conf conf.d/sites.conf
docker compose restart nginx 2>/dev/null || docker compose up -d nginx
sleep 3

echo ""
echo "=== Step 2: 申请 Let's Encrypt 证书 ==="
for entry in "${DOMAINS[@]}"; do
    IFS=',' read -ra PARTS <<< "$entry"
    DOMAIN_ARGS=""
    for d in "${PARTS[@]}"; do
        DOMAIN_ARGS="$DOMAIN_ARGS -d $d"
    done

    echo ""
    echo ">>> 申请: $DOMAIN_ARGS"

    docker run --rm \
        -v /opt/nginx/certbot/www:/var/www/certbot \
        -v /opt/nginx/certbot/conf:/etc/letsencrypt \
        certbot/certbot:latest \
        certonly --webroot \
        --webroot-path=/var/www/certbot \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        $DOMAIN_ARGS
done

echo ""
echo "=== Step 3: 切换到 HTTPS 配置 ==="
cp templates/sites-https.conf conf.d/sites.conf
docker compose exec nginx nginx -s reload

echo ""
echo "=== Step 4: 启动全部服务(含自动续期) ==="
docker compose up -d

echo ""
echo "=== 完成! ==="
docker compose ps
