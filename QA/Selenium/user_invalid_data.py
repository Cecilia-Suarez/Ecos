from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Configurar el driver de Chrome
driver = webdriver.Chrome()

try:
    # Abrir la página
    driver.get("https://ftg-ecos.netlify.app/")

    # Click en el botón de login
    driver.find_element(By.XPATH, "//div[@id='root']/div/header/div/div/div/div/button[2]").click()

    # Click en el botón dentro del portal
    driver.find_element(By.XPATH, "//div[@id='portal-root']/div/div/div[2]/div[2]/div/button").click()

    # Introducir datos en los campos del formulario
    driver.find_element(By.NAME, "name").click()
    driver.find_element(By.NAME, "name").send_keys("fan user noOk")

    driver.find_element(By.NAME, "email").click()
    driver.find_element(By.NAME, "email").send_keys("fan")

    driver.find_element(By.NAME, "password").click()
    driver.find_element(By.NAME, "password").send_keys("1111")

    driver.find_element(By.NAME, "terms").click()

    # Enviar formulario
    driver.find_element(By.XPATH, "//div[@id='portal-root']/div/div/div[2]/form/button").click()

    # Esperar unos segundos para verificar el resultado 
    time.sleep(3)

    # Verificar si el registro fue exitoso
    mensaje_error = driver.find_elements(By.CLASS_NAME, "error-message")  

    if mensaje_error:
        print("Prueba fallida: Se mostraron errores de validación.🐞")
    else:
        print("Prueba exitosa: No se encontraron errores de validación. ✅ ")

except Exception as e:
    print(f"Error en la ejecución de la prueba: {e}")

finally:
    # Cerrar navegador
    driver.quit()