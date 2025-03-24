Levantar el contenedor o los contenedores necesarios

docker-compose up --build -d

Para detener los contenedores

docker-compose down

Para ver los logs de un contenedor

docker logs -f <container_id>

Para ver los logs de todos los contenedores

docker-compose logs -f

Para ver los contenedores que están corriendo

docker ps

Para ver los contenedores que están detenidos

docker ps -a

Una vez ok configurar el servidor web con nginx

Crea un archivo de configuración en /etc/nginx/sites-available/ para visor.between-bytes.tech

sudo nginx -t

Por ejemplo, para visor.between-bytes.tech

sudo nano /etc/nginx/sites-available/visor.between-bytes.tech

# primer servidor HTTP

server {
listen 80;
server_name visor.between-bytes.tech;

    location / {
        proxy_pass http://localhost:1000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Redirige tráfico HTTP a HTTPS
    return 301 https://$server_name$request_uri;

}

# luego el servidor HTTPS con SSL

server {
listen 443 ssl;
server_name visor.between-bytes.tech;

    ssl_certificate /etc/letsencrypt/live/visor.between-bytes.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/visor.between-bytes.tech/privkey.pem;

    location / {
        proxy_pass http://localhost:1000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

}

sudo nginx -t

sudo ln -s /etc/nginx/sites-available/visor.between-bytes.tech /etc/nginx/sites-enabled/

sudo nginx -t

Si la configuración es correcta, verás un mensaje como:

nginx: configuration file /etc/nginx/nginx.conf test is successful

Usar Certbot para obtener los certificados SSL

sudo certbot --nginx -d visor.between-bytes.tech

Verificar la configuración

sudo nginx -t

sudo systemctl restart nginx

Renovar los certificados automáticamente

sudo certbot renew

Verifica que la renovación se haya realizado correctamente:

sudo systemctl reload nginx

Configura la renovación automáticamente:

sudo systemctl enable certbot.timer

Comandos para borrado de configuraciones de nginx solo cuando quiera eliminar un dominio
sudo rm -f /etc/nginx/sites-available/visor.between-bytes.tech
sudo rm -f /etc/nginx/sites-enabled/visor.between-bytes.tech


server {
    listen 80;
    server_name visor.between-bytes.tech;

    root /var/www/visor.between-bytes.tech;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
