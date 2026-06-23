import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'Eliminación de Datos | Nuevo Wevo',
  description: 'Instrucciones para solicitar la eliminación de tus datos personales en Nuevo Wevo S.A.S., conforme a la Ley 1581 de 2012.',
};

export default function EliminacionDatosPage() {
  return (
    <LegalPage
      label="Legal"
      title="Instrucciones para Eliminación de Datos"
      updated="24 de junio de 2026"
    >

      <p>
        En Nuevo Wevo S.A.S. respetamos tu derecho a eliminar la información que hayamos recopilado a través de
        nuestra aplicación conectada a Facebook e Instagram, en cumplimiento de la Ley 1581 de 2012 de
        Protección de Datos Personales de Colombia.
      </p>

      <h2>Cómo Solicitar la Eliminación de tus Datos</h2>
      <p>Tienes dos opciones:</p>

      <h3>Opción 1 — Revocar el acceso directamente en Facebook</h3>
      <ol>
        <li>Abre Facebook e ingresa a <strong>Configuración y privacidad</strong>.</li>
        <li>Selecciona <strong>Configuración → Aplicaciones y sitios web</strong>.</li>
        <li>Busca <strong>"Nuevo Wevo"</strong> en la lista.</li>
        <li>Haz clic en <strong>Eliminar</strong>.</li>
      </ol>
      <p>
        Al revocar el acceso, recibiremos automáticamente la notificación de Meta y eliminaremos los datos
        asociados a tu cuenta en un plazo máximo de 30 días.
      </p>

      <h3>Opción 2 — Solicitud directa por correo</h3>
      <p>
        Envíanos un correo a{' '}
        <a href="mailto:ventas@nuevowevo.com">ventas@nuevowevo.com</a> con el asunto{' '}
        <strong>"Eliminación de datos"</strong> e incluye:
      </p>
      <ul>
        <li>Tu nombre completo.</li>
        <li>Tipo y número de documento.</li>
        <li>El correo o ID de usuario de Facebook asociado.</li>
        <li>Confirmación de que deseas eliminar tus datos.</li>
      </ul>
      <p>
        Responderemos en un máximo de 10 días hábiles y completaremos la eliminación en un plazo máximo de
        30 días desde la recepción de la solicitud.
      </p>

      <h2>Qué Datos se Eliminan</h2>
      <ul>
        <li>Tokens de acceso almacenados.</li>
        <li>Información de perfil recopilada por nuestra aplicación.</li>
        <li>Registros de publicaciones o campañas procesadas por nuestra aplicación.</li>
        <li>Cualquier dato personal vinculado a tu cuenta dentro de nuestros sistemas de marketing digital.</li>
      </ul>

      <h2>Qué NO Podemos Eliminar</h2>
      <ul>
        <li>
          Datos que ya hayan sido publicados por ti o por tu autorización en Facebook/Instagram (esos debes
          eliminarlos desde las propias plataformas).
        </li>
        <li>
          Registros que debamos conservar por obligación legal, contable o tributaria en Colombia (facturación,
          garantías, entre otros), conforme al Estatuto Tributario y al Código de Comercio.
        </li>
        <li>
          Información asociada a compras realizadas, la cual se conserva conforme a la ley.
        </li>
      </ul>

      <h2>Contacto</h2>
      <ul>
        <li><strong>Responsable del tratamiento:</strong> Nuevo Wevo S.A.S.</li>
        <li><strong>Domicilio:</strong> Bogotá D.C., Colombia</li>
        <li><strong>Dirección:</strong> Cra. 67 #43-35, Bogotá, Cundinamarca</li>
        <li><strong>Correo:</strong> <a href="mailto:ventas@nuevowevo.com">ventas@nuevowevo.com</a></li>
        <li><strong>Celular / WhatsApp:</strong> 316 3713928</li>
        <li><strong>Sitio web:</strong> <a href="https://www.nuevowevo.com" target="_blank" rel="noreferrer">www.nuevowevo.com</a></li>
      </ul>

    </LegalPage>
  );
}
