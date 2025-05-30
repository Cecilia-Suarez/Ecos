from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Configurar el driver de Chrome
driver = webdriver.Chrome()

try:
    # Abrir la página
    driver.get("https://ftg-ecos.netlify.app/")
    print("Página abierta correctamente.")

    # Click en el botón de inicio de sesión
    driver.find_element(By.XPATH, "//button[@type='button']").click()
    print("Botón de inicio de sesión presionado.")

    # Seleccionar tipo de usuario (músico)
    driver.find_element(By.XPATH, "//div[@id='portal-root']/div/div/div[2]/form/div/div").click()
    print("Tipo de usuario seleccionado.")

    # Introducir datos en los campos del formulario
    driver.find_element(By.NAME, "email").click()
    driver.find_element(By.NAME, "email").send_keys("musico1@gmail.com")
    print("Correo electrónico ingresado.")

    # Click en un elemento 
    driver.find_element(By.XPATH, "(.//*[normalize-space(text()) and normalize-space(.)='ECOS'])[2]/following::*[name()='svg'][2]").click()
    print("Elemento SVG seleccionado.")

    # Introducir la contraseña
    driver.find_element(By.NAME, "password").click()
    driver.find_element(By.NAME, "password").send_keys("12345678")
    print("Contraseña ingresada.")

    # Click en el botón de inicio de sesión
    driver.find_element(By.XPATH, "//button[@type='submit']").click()
    print("Formulario enviado.")

    # Esperar unos segundos para verificar el resultado
    time.sleep(3)

    # Verificar si el login fue exitoso
    mensaje_error = driver.find_elements(By.CLASS_NAME, "error-message")  

    if mensaje_error:
        print("Prueba fallida: Se mostraron errores de validación. ❌")
    else:
        print("Prueba exitosa: Inicio de sesión completado. ✅")

except Exception as e:
    print(f"Error en la ejecución de la prueba: {e}")

finally:
    # Cerrar navegador
    driver.quit()
    print("Prueba finalizada. Navegador cerrado.")