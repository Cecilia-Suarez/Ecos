from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Configurar el driver de Chrome
driver = webdriver.Chrome()

try:
    # Abrir la página
    driver.get("https://ftg-ecos.netlify.app/")
    print("✅ Página abierta correctamente.")

    # Click en el botón de registro
    driver.find_element(By.XPATH, "//div[@id='root']/div/header/div/div/div/div/button[2]").click()
    print("✅ Botón de registro presionado.")

    # Click en el botón de creación de músico
    driver.find_element(By.XPATH, "//div[@id='portal-root']/div/div/div[2]/div/div/button").click()
    print("✅ Se inició el proceso de creación de músico.")

    # Introducir datos inválidos en los campos del formulario
    driver.find_element(By.NAME, "name").click()
    driver.find_element(By.NAME, "name").send_keys("musicoNo1")
    print("✅ Nombre ingresado.")

    driver.find_element(By.NAME, "email").click()
    driver.find_element(By.NAME, "email").send_keys("musicoNo1")  
    print("✅ Correo electrónico inválido ingresado.")

    driver.find_element(By.NAME, "password").click()
    driver.find_element(By.NAME, "password").send_keys("12345678")
    print("✅ Contraseña ingresada.")

    driver.find_element(By.NAME, "terms").click()
    print("✅ Términos aceptados.")

    # Enviar formulario
    driver.find_element(By.XPATH, "//button[@type='submit']").click()
    print("✅ Formulario enviado.")

    # Esperar unos segundos para verificar el resultado
    time.sleep(3)

    # Verificar si el sistema muestra errores de validación
    mensaje_error = driver.find_elements(By.CLASS_NAME, "error-message")  

    if mensaje_error:
        print("❌ Prueba fallida: El sistema permitió la creación del músico con datos incorrectos..")
    else:
        print("✅ Prueba exitosa: El sistema bloqueó la creación del músico con datos inválidos ")

except Exception as e:
    print(f"⚠️ Error en la ejecución de la prueba: {e}")

finally:
    # Cerrar navegador
    driver.quit()
    print("🛑 Prueba finalizada. Navegador cerrado.")