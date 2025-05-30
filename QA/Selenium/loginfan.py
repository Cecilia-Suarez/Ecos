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

    # Introducir datos en los campos del formulario de datos personales que los desarrolladores decidieron para la prueba
    driver.find_element(By.NAME, "email").click()
    driver.find_element(By.NAME, "email").send_keys("brendayohenatanoni@gmail.com")
    print("Correo electrónico ingresado.")

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
        print("Prueba exitosa: Inicio de sesión exitoso. ✅")

except Exception as e:
    print(f"Error en la ejecución de la prueba: {e}")

finally:
    # Cerrar navegador
    driver.quit()
    print("Prueba finalizada. Navegador cerrado.")