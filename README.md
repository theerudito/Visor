# Alojar un sitio web React en un servidor Ubuntu con Nginx

# verificar la configuración de nginx

sudo nginx -t

# crear un directorio para el sitio web

sudo mkdir -p /var/www/visor.between-bytes.tech

# copiar los archivos estáticos dist o build de tu proyecto React a la carpeta del sitio web

sudo cp -r /ruta/a/tu/proyecto-react/dist/\* /var/www/visor.between-bytes.tech/

# crear un archivo de configuración en /etc/nginx/sites-available/

```nginx
sudo nano /etc/nginx/sites-available/visor.between-bytes.tech
```

# configuración del servidor

```nginx
server {
listen 80;
server_name visor.between-bytes.tech;

    root /var/www/visor.between-bytes.tech;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

}
```

# verificar la configuración de nginx

sudo nginx -t

# luego crear un enlace simbólico en /etc/nginx/sites-enabled/

sudo ln -s /etc/nginx/sites-available/visor.between-bytes.tech /etc/nginx/sites-enabled/

# luego editamos el archivo de configuracion para el servidor HTTPS con SSL

server {
listen 443 ssl;
server_name visor.between-bytes.tech;

    ssl_certificate /etc/letsencrypt/live/visor.between-bytes.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/visor.between-bytes.tech/privkey.pem;

    location / {
        proxy_pass visor.between-bytes.tech
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

}

# verificar la configuración de nginx

sudo nginx -t

# Si la configuración es correcta, verás un mensaje como:

nginx: configuration file /etc/nginx/nginx.conf test is successful

# Usar Certbot para obtener los certificados SSL

sudo certbot --nginx -d visor.between-bytes.tech

# Verificar la configuración

sudo nginx -t

# Reiniciar Nginx

sudo systemctl restart nginx

# Renovar los certificados automáticamente

sudo certbot renew

# Verifica que la renovación se haya realizado correctamente:

sudo certbot certificates

# recargar la configuración de nginx

sudo systemctl reload nginx

# Configura la renovación automáticamente:

sudo systemctl enable certbot.timer

# tipos para borrado de configuraciones de nginx solo cuando quiera eliminar un dominio

sudo rm /etc/nginx/sites-available/visor.between-bytes.tech
sudo rm /etc/nginx/sites-enabled/visor.between-bytes.tech
sudo rm /etc/www/visor.between-bytes.tech
sudo rm /etc/letsencrypt/live/visor.between-bytes.tech

# reiniciar nginx

sudo systemctl restart nginx
