// Contenido por defecto de las 4 páginas legales, en Markdown. Es el mismo
// texto que antes estaba escrito directamente como JSX en cada página — se
// usa como respaldo mientras no haya nada guardado en site_settings, así
// que el sitio no cambia visualmente hasta que un admin edite algo desde
// /admin/legal.

export type LegalSlug = 'terminos' | 'politica-privacidad' | 'datos-personales' | 'eliminacion-datos';

export interface LegalPageContent {
  title: string;
  updatedLabel: string;
  contentMarkdown: string;
}

export const LEGAL_SLUGS: LegalSlug[] = ['terminos', 'politica-privacidad', 'datos-personales', 'eliminacion-datos'];

export const LEGAL_PAGE_META: Record<LegalSlug, { label: string; metaTitle: string; metaDescription: string }> = {
  terminos: {
    label: 'Términos y Condiciones',
    metaTitle: 'Términos y Condiciones | Nuevo Wevo',
    metaDescription:
      'Términos, condiciones e información legal vigentes de Nuevo Wevo S.A.S. Conoce las reglas que regulan el uso de nuestra tienda online.',
  },
  'politica-privacidad': {
    label: 'Política de Privacidad',
    metaTitle: 'Política de Privacidad | Nuevo Wevo',
    metaDescription: 'Política de privacidad de Nuevo Wevo S.A.S. Conoce cómo recopilamos, usamos y protegemos tu información personal.',
  },
  'datos-personales': {
    label: 'Tratamiento de Datos Personales',
    metaTitle: 'Tratamiento de Datos Personales | Nuevo Wevo',
    metaDescription:
      'Políticas de tratamiento para la protección de datos personales de Nuevo Wevo S.A.S., conforme a la Ley 1581 de 2012 y la Ley 2439 de 2024.',
  },
  'eliminacion-datos': {
    label: 'Eliminación de Datos',
    metaTitle: 'Eliminación de Datos | Nuevo Wevo',
    metaDescription: 'Instrucciones para solicitar la eliminación de tus datos personales en Nuevo Wevo S.A.S., conforme a la Ley 1581 de 2012.',
  },
};

export const DEFAULT_LEGAL_PAGES: Record<LegalSlug, LegalPageContent> = {
  terminos: {
    title: 'Términos, Condiciones e Información Legal',
    updatedLabel: 'Junio de 2026 | www.nuevowevo.com',
    contentMarkdown: `## Recepción para Garantía

Para realizar cualquier evaluación por garantía, el cliente deberá entregar el producto en nuestras instalaciones, debidamente empacado y con sus accesorios cuando aplique. Los costos de envío o transporte hasta nuestro punto de atención serán asumidos inicialmente por el cliente.

Si, una vez realizada la evaluación técnica, se determina que la falla está cubierta por la garantía legal o la garantía ofrecida por Nuevo Wevo, los costos de transporte asociados al cumplimiento de la garantía serán asumidos por Nuevo Wevo.

Si la garantía es rechazada por no cumplir las condiciones de cobertura, los costos de transporte y devolución serán asumidos por el cliente.

## Ámbito de Aplicación

Los presentes Términos y Condiciones aplican a todas las compras realizadas a Nuevo Wevo, independientemente del canal utilizado por el cliente, incluyendo, entre otros:

- Sitio web oficial.
- WhatsApp.
- Redes sociales (Facebook, Instagram, TikTok y demás plataformas).
- Atención telefónica.
- Venta presencial en nuestras instalaciones.
- Cualquier otro canal oficial autorizado por Nuevo Wevo.

Al realizar una compra por cualquiera de estos medios, el cliente declara haber leído, comprendido y aceptado los presentes Términos y Condiciones.

## Errores en Información

Nuevo Wevo S.A.S. realiza sus mejores esfuerzos para mantener la información del sitio web actualizada y precisa. Sin embargo, los contenidos publicados —incluyendo precios, especificaciones técnicas, imágenes y disponibilidad de productos— tienen carácter informativo y pueden estar sujetos a cambios sin previo aviso.

En consecuencia, Nuevo Wevo S.A.S. no se responsabiliza por decisiones tomadas con base en dicha información, ni por errores tipográficos o de publicación que puedan presentarse.

## Uso de Datos

De acuerdo con la Ley 1581 de 2012 de Protección de Datos Personales (Habeas Data), al aceptar estos términos usted autoriza a Nuevo Wevo S.A.S. para recolectar, registrar, procesar, actualizar y utilizar los datos personales suministrados durante el registro y uso de www.nuevowevo.com.

Para el correcto procesamiento de sus pedidos, Nuevo Wevo S.A.S. comparte datos personales con los siguientes terceros, quienes actúan como encargados del tratamiento para fines específicos y limitados:

- **Operadores logísticos y transportadoras** (entre ellos Envia.com, Coordinadora, Servientrega, TCC, Interrapidísimo y otros) — reciben nombre, dirección y teléfono exclusivamente para generar guías de transporte y gestionar la entrega de sus pedidos.
- **Pasarelas de pago** (Mercado Pago y otras) — reciben los datos necesarios para procesar transacciones de forma segura. El manejo de información financiera se rige por las políticas de privacidad de cada entidad.
- **Fabricantes y distribuidores autorizados** (como Nvidia, LG y otros) — pueden recibir datos de ventas para fines estadísticos y de gestión de garantías, en cumplimiento de acuerdos comerciales.

Nuevo Wevo S.A.S. exige contractualmente a estos terceros que traten los datos únicamente para los fines aquí descritos y que cumplan con la normativa colombiana de protección de datos. Sin embargo, una vez transferidos los datos al encargado correspondiente, el tratamiento posterior que cada tercero realice se rige por sus propias políticas de privacidad.

Sus datos no serán vendidos ni cedidos con fines publicitarios sin su consentimiento. Como titular, usted tiene derecho a conocer, actualizar, rectificar y suprimir su información, revocar la autorización otorgada y presentar quejas ante la Superintendencia de Industria y Comercio. Para ejercer estos derechos contáctenos en [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com).

## Uso de los Canales de Atención

Nuevo Wevo S.A.S. atiende a sus clientes a través de dos canales principales: el sitio web www.nuevowevo.com y sus puntos de venta físicos. Las condiciones descritas en esta sección aplican específicamente al uso del canal digital.

Al ingresar y utilizar el sitio web www.nuevowevo.com, el usuario acepta que su navegación y las acciones que realice en el mismo son de su exclusiva responsabilidad.

Nuevo Wevo S.A.S. realiza sus mejores esfuerzos para mantener el sitio disponible de forma continua y sin interrupciones. Sin embargo, no garantiza que el sitio esté libre de errores técnicos, interrupciones del servicio o problemas derivados de factores externos como fallas en servidores, conexiones a internet o eventos de fuerza mayor.

Los contenidos publicados en este sitio están orientados al mercado colombiano. Nuevo Wevo S.A.S. no garantiza que la información sea aplicable o adecuada para usuarios fuera del territorio de Colombia.

Queda prohibido el uso indebido del sitio, incluyendo la suplantación de identidad, el uso de bots o herramientas automatizadas de navegación, y cualquier actividad de naturaleza fraudulenta.

## Aceptación de Términos

Al ingresar, navegar y/o utilizar este sitio, el usuario declara haber leído, entendido y aceptado los presentes Términos y Condiciones, comprometiéndose a cumplir con todas las leyes y reglamentos aplicables de la legislación colombiana.

Esta aceptación se extiende a todos los servicios y canales disponibles en el sitio y fuera de él, incluyendo chat en vivo, WhatsApp, correo electrónico, redes sociales y el formulario de contacto. Cada uno de estos canales puede estar sujeto a condiciones particulares de uso, las cuales complementan los presentes términos.

Estos términos y condiciones pueden ser modificados por Nuevo Wevo S.A.S. en cualquier momento. Los cambios entrarán en vigencia desde el momento en que sean publicados en el sitio. Se recomienda al usuario revisarlos periódicamente. El uso continuado del sitio tras una modificación implica la aceptación de los nuevos términos.

Este sitio es operado por Nuevo Wevo S.A.S. desde Colombia y está orientado exclusivamente al mercado colombiano. Queda prohibido el uso del sitio para actividades fraudulentas, la suplantación de identidad de otros usuarios, o cualquier conducta que contravenga la legislación colombiana vigente.

## Sobre Nuevo Wevo S.A.S.

www.nuevowevo.com es el sitio web oficial de Nuevo Wevo S.A.S., empresa colombiana dedicada a la comercialización de computadores gaming, periféricos y accesorios tecnológicos de alta calidad.

Nuevo Wevo S.A.S. está constituida bajo las leyes colombianas y opera dentro del territorio de la República de Colombia, tanto a través de su plataforma de comercio electrónico como en su punto de venta físico ubicado en la Cra. 67 #43-35, Bogotá, Cundinamarca.

Entre nuestros compromisos con los clientes se destacan los envíos a todo el territorio colombiano, procesos de garantía ágiles y una atención especializada en el sector tecnológico gaming.

La marca Nuevo Wevo está debidamente registrada y es propiedad exclusiva de Nuevo Wevo S.A.S.

## Derechos de Propiedad Intelectual

Todo el contenido disponible en www.nuevowevo.com —incluyendo textos, descripciones de productos, fotografías, imágenes, videos, diseños gráficos, logotipos y bases de datos— es propiedad exclusiva de Nuevo Wevo S.A.S. o ha sido utilizado con autorización expresa de sus respectivos titulares.

Las marcas, logotipos y material gráfico de los productos comercializados son propiedad de sus respectivos fabricantes y se usan en este sitio únicamente con fines informativos y comerciales dentro del marco de los acuerdos vigentes con dichos fabricantes.

Queda estrictamente prohibida la copia, reproducción, modificación, distribución o uso no autorizado de cualquier contenido de este sitio, por cualquier medio, sin el permiso previo y por escrito de Nuevo Wevo S.A.S. o del titular correspondiente. El incumplimiento de esta disposición dará lugar a las acciones legales civiles y penales que correspondan.

Nuevo Wevo S.A.S. otorga al usuario una licencia personal, intransferible y no exclusiva para visualizar el contenido del sitio únicamente para fines de navegación y compra.

## Propiedad Industrial

La marca Nuevo Wevo, su logotipo, nombre comercial y los elementos distintivos del diseño de www.nuevowevo.com son propiedad exclusiva de Nuevo Wevo S.A.S. y se encuentran debidamente registrados ante las autoridades competentes.

Las marcas de los productos ofrecidos en este sitio —incluyendo pero sin limitarse a Nvidia, LG, HP, Dell, Lenovo, HyperX y demás fabricantes— son propiedad de sus respectivos titulares. Su aparición en este sitio no implica ninguna cesión de derechos sobre las mismas.

Ningún contenido de este sitio podrá interpretarse como una autorización para usar la propiedad industrial de Nuevo Wevo S.A.S. o de terceros sin el consentimiento previo y por escrito del titular correspondiente. El uso no autorizado constituirá una violación a la normativa nacional e internacional vigente y dará lugar a las acciones legales pertinentes.

## Responsabilidad Limitada

Nuevo Wevo S.A.S. no será responsable por daños o perjuicios derivados de situaciones fuera de su control, incluyendo fallas en servidores o conexiones a internet, interrupciones del servicio por mantenimiento, eventos de fuerza mayor o caso fortuito, ni por el uso indebido que el usuario haga del sitio o de la información disponible en él.

Asimismo, Nuevo Wevo S.A.S. no asume responsabilidad por problemas técnicos generados en los dispositivos del usuario como consecuencia del uso del sitio, ni por daños derivados de la navegación en sitios de terceros accesibles mediante enlaces publicados en este portal.

Lo anterior no limita ni reemplaza los derechos que le asisten al consumidor en virtud de la Ley 1480 de 2011 (Estatuto del Consumidor) y demás normas aplicables, particularmente en lo referente a garantías sobre productos adquiridos.

## Publicidad y Vínculos

El sitio www.nuevowevo.com puede incluir micrositios, secciones especiales o material promocional de marcas aliadas y fabricantes autorizados (como Nvidia, LG, HyperX y otros), cuyo contenido gráfico es proporcionado por dichos fabricantes pero publicado y administrado íntegramente por Nuevo Wevo S.A.S. La presencia de este material no implica una relación de propiedad entre Nuevo Wevo y dichas marcas, cuyos derechos sobre sus respectivos contenidos permanecen en cabeza de sus titulares.

El sitio puede contener enlaces a páginas externas de fabricantes, manuales técnicos, sitios de soporte o redes sociales. Nuevo Wevo S.A.S. no controla el contenido de estos sitios externos y no asume responsabilidad por su disponibilidad, exactitud o políticas de privacidad. El acceso a sitios externos es responsabilidad exclusiva del usuario.

Nuevo Wevo S.A.S. no cuenta con publicidad de terceros independientes ni espacios publicitarios pagados por fuera de sus acuerdos comerciales con fabricantes y distribuidores autorizados.

## Revisión de los Términos

Nuevo Wevo S.A.S. se reserva el derecho de actualizar o modificar los presentes Términos y Condiciones en cualquier momento. Cuando se realicen cambios relevantes, Nuevo Wevo S.A.S. notificará a sus usuarios registrados mediante correo electrónico o mediante un aviso visible en el sitio web.

Los cambios entrarán en vigencia desde el momento de su publicación. El uso continuado del sitio tras la publicación de modificaciones implica la aceptación de los nuevos términos.

## Términos del Contrato

El contrato de compraventa entre el cliente y Nuevo Wevo S.A.S. se perfecciona en el momento en que Nuevo Wevo confirma la aceptación de la orden de compra, lo cual se comunicará al cliente mediante un correo electrónico de confirmación enviado a la dirección registrada en el sitio.

Nuevo Wevo S.A.S. se reserva el derecho de rechazar o cancelar cualquier orden de compra por razones de disponibilidad de inventario, errores en el precio publicado u otras causas operativas. En estos casos, Nuevo Wevo S.A.S. procederá a la devolución íntegra del valor pagado por el cliente dentro de los plazos establecidos por la ley, sin que dicha cancelación genere derecho a indemnización, compensación adicional o reconocimiento de perjuicios a favor del cliente.

Los servicios de este sitio están disponibles únicamente para personas con capacidad legal para contratar según la legislación colombiana vigente. Se entiende que tienen capacidad legal para contratar las personas mayores de 18 años. Si usted es menor de edad, le solicitamos que realice sus compras con la asistencia de un adulto responsable.

## Presentación de la Oferta

### Canal online

Para realizar una compra en www.nuevowevo.com, el cliente deberá seleccionar los productos deseados, completar el formulario de compra con sus datos personales y de entrega, y elegir el método de pago disponible. Una vez enviada la orden, esta tendrá carácter vinculante para el cliente. Nuevo Wevo S.A.S. notificará su aceptación o rechazo mediante correo electrónico.

### Canal presencial

En nuestro punto de venta físico, la oferta de compra se perfecciona en el momento en que el cliente y el asesor de ventas acuerdan las condiciones del producto, precio y forma de pago, y se emite la factura correspondiente.

En ambos canales, los precios están sujetos a cambios hasta el momento de la confirmación oficial de la compra. En caso de error en el precio, Nuevo Wevo S.A.S. informará al cliente, quien podrá continuar con la compra al precio correcto o cancelar sin ningún costo.

## Condiciones de Pago

### Canal online

Nuevo Wevo S.A.S. ofrece múltiples métodos de pago para garantizar una experiencia de compra flexible y segura. Actualmente se aceptan los siguientes medios de pago:

- **Pagos digitales:** tarjeta de crédito y débito, PSE, QR, Nequi, BRE-B, transferencia bancaria, link de pago y billeteras digitales como Mercado Pago.
- **Pasarelas de pago:** Nuevo Wevo S.A.S. procesa sus transacciones a través de plataformas certificadas como Mercado Pago y otras que puedan incorporarse en el futuro. La lista de pasarelas disponibles puede actualizarse sin previo aviso en función de mejoras operativas o de seguridad.
- **Pago contra entrega:** disponible en modalidad efectivo para pedidos seleccionados según zona geográfica y valor del pedido.
- **Financiación:** disponible a través de Addi, sujeta a aprobación por parte de dicha entidad y sus propias condiciones.

### Canal presencial

En nuestro punto de venta físico se aceptan pagos en efectivo, tarjeta débito y crédito, transferencia bancaria y QR.

En ningún caso Nuevo Wevo S.A.S. será responsable por fallas técnicas de las plataformas de pago o entidades financieras. Una vez verificado el pago, se procederá a la confirmación del pedido.

## Cargos por Envío e Impuestos

### Envíos

Nuevo Wevo S.A.S. realiza envíos a todo el territorio colombiano continental. Se exceptúan los envíos con destino a San Andrés, Providencia y Santa Catalina, para los cuales se aplicará un cargo adicional de transporte que será informado al cliente antes de confirmar su pedido.

Para entregas en zonas de difícil acceso o municipios con cobertura limitada por parte de las transportadoras, los tiempos de entrega pueden extenderse y podrían aplicar condiciones especiales que serán informadas oportunamente.

### Impuestos

Los precios publicados en www.nuevowevo.com incluyen IVA cuando este aplique. De acuerdo con la legislación tributaria colombiana vigente, algunos productos tecnológicos pueden estar excluidos o exentos de IVA dependiendo de su categoría y valor. En estos casos, el precio que ve en el sitio es el precio final a pagar.

Nuevo Wevo S.A.S. se reserva el derecho de ajustar los precios en caso de cambios en la normativa tributaria colombiana, sin que ello genere responsabilidad adicional frente al cliente.

## Perfeccionamiento y Transferencia de Propiedad

La propiedad sobre los productos adquiridos se transfiere al cliente según el canal y modalidad de compra:

- **Compras online con pago anticipado:** la propiedad se transfiere al cliente desde el momento en que Nuevo Wevo S.A.S. confirma el pago y despacha el pedido desde sus instalaciones.
- **Compras online con pago contra entrega:** la propiedad se transfiere al cliente en el momento en que realiza el pago al transportador en el lugar de entrega.
- **Compras en tienda física:** la propiedad se transfiere al cliente en el momento del pago y entrega física del producto en el punto de venta.

En caso de incumplimiento de pago en cualquiera de las modalidades anteriores, Nuevo Wevo S.A.S. podrá dar por terminado el contrato y el cliente asumirá los costos de devolución del producto y los perjuicios que dicho incumplimiento genere.

## Entrega de los Productos

### Entregas en Bogotá

Nuevo Wevo S.A.S. gestiona entregas en Bogotá a través de mensajería propia o transportadoras aliadas. Los pedidos realizados antes de las 5:00 p.m. serán atendidos con prioridad, sujeto a disponibilidad. Nuestros mensajeros se comunicarán con el cliente para coordinar la entrega.

Nuevo Wevo S.A.S. se reserva el derecho de suspender o reprogramar una entrega cuando las condiciones de seguridad en la zona de destino representen un riesgo para el personal de mensajería. En estos casos, el cliente será notificado inmediatamente y se coordinará una solución alternativa sin costo adicional.

### Entregas nacionales — Transportadoras certificadas

Para envíos fuera de Bogotá, Nuevo Wevo S.A.S. utiliza transportadoras certificadas a nivel nacional. El tiempo estimado de entrega es de **3 a 6 días hábiles**, sin importar la ciudad o municipio de destino.

Una vez el pedido es entregado a la transportadora, la responsabilidad sobre el envío recae en dicha empresa conforme a la normativa colombiana de transporte de carga. En caso de pérdida o daño durante el transporte, Nuevo Wevo S.A.S. acompañará al cliente en el proceso de reclamación ante la transportadora correspondiente.

Se entiende autorizada para recibir el pedido cualquier persona mayor de edad que se encuentre en el domicilio registrado por el cliente al momento de la compra.

### San Andrés, Providencia y Santa Catalina

Los envíos a estos destinos están sujetos a tarifas y tiempos adicionales informados al momento de la compra.

### Ventas a través de Marketplaces

Nuevo Wevo S.A.S. puede comercializar productos a través de plataformas de terceros. Las transacciones realizadas en dichos canales se rigen principalmente por los términos y condiciones de cada plataforma. Las garantías postventa podrán gestionarse directamente con Nuevo Wevo S.A.S. según las políticas descritas en estos términos.

## Productos y Servicios

Nuevo Wevo S.A.S. comercializa productos y ofrece servicios en las siguientes categorías:

### Productos nuevos

Computadores, torres gaming, periféricos, accesorios y tecnología en general, disponibles tanto en el sitio web como en el punto de venta físico.

### Productos Outlet

Productos open box, con empaque deteriorado o con detalles estéticos menores, pero en condiciones funcionales. Estos productos cuentan con una garantía reducida que será informada explícitamente al momento de la compra. Al adquirir un producto Outlet, el cliente declara conocer y aceptar su condición.

### Productos Refurbished (reacondicionados)

Equipos que han sido devueltos, reparados y certificados para su reventa en condiciones funcionales óptimas. Cuentan con una garantía específica que será informada explícitamente al momento de la compra. Las condiciones estéticas pueden no ser perfectas, lo cual será detallado en la descripción de cada producto.

### Preventas

Nuevo Wevo S.A.S. puede ofrecer productos en preventa antes de contar con disponibilidad inmediata de inventario. La fecha estimada de entrega será informada al momento de la compra y podrá estar sujeta a cambios por razones de disponibilidad del fabricante o importador, sin que ello genere derecho a indemnización adicional. En caso de no poder cumplir con la entrega, se reembolsará el valor pagado en su totalidad.

### Servicios

Nuevo Wevo S.A.S. ofrece servicios de mantenimiento preventivo y correctivo, ensamble de equipos, asesoría técnica y comercial, y otros servicios relacionados con tecnología. Las condiciones específicas de cada servicio —incluyendo tiempos, alcance y garantía— serán acordadas con el cliente al momento de la contratación.

Nuevo Wevo S.A.S. se reserva el derecho de modificar, descontinuar o agregar productos y servicios en cualquier momento sin previo aviso, sin que ello genere responsabilidad frente al cliente.

## Colores y Visualización de los Productos

Las imágenes de los productos publicadas en www.nuevowevo.com tienen carácter ilustrativo y pueden corresponder a imágenes de referencia proporcionadas por el fabricante. Los colores, acabados y detalles visuales pueden variar respecto al producto real debido a diferencias en la configuración de pantalla de cada dispositivo o a actualizaciones de diseño por parte del fabricante.

Nuevo Wevo S.A.S. realiza sus mejores esfuerzos para mantener imágenes actualizadas y representativas de cada producto. En caso de duda sobre las características físicas de un producto, el cliente puede contactarnos antes de realizar su compra a través de nuestros canales de atención.

## Limitación de Cantidades y Restricción de Pedidos

Nuevo Wevo S.A.S. se reserva el derecho de limitar las cantidades de compra por cliente, por pedido o por hogar, especialmente en productos con disponibilidad limitada o en promociones activas.

Nuevo Wevo S.A.S. se reserva el derecho de cancelar, limitar o rechazar pedidos que presenten patrones inusuales de compra, incluyendo adquisiciones masivas de un mismo producto, compras realizadas mediante herramientas automatizadas o bots, o cualquier comportamiento que sugiera una intención de reventa no autorizada que afecte la disponibilidad del producto para el usuario final.

La venta a través de www.nuevowevo.com está orientada al consumidor final. Los clientes interesados en compras mayoristas pueden contactarnos a través de [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com).

En caso de cancelación de un pedido por las razones anteriores, se realizará la devolución íntegra del valor pagado sin que ello genere derecho a compensación adicional.

## Devoluciones y Cambios

### Derecho de retracto — Canal online

De conformidad con el Artículo 47 de la Ley 1480 de 2011 y sus modificaciones según la Ley 2439 de 2024, el cliente tiene derecho a retractarse de una compra realizada por medios electrónicos dentro de los cinco (5) días hábiles siguientes a la entrega del producto, sin necesidad de expresar causa, siempre que el producto no haya sido usado y se encuentre en su empaque original.

Una vez ejercido el derecho de retracto, Nuevo Wevo S.A.S. tramitará el reembolso del valor pagado en un plazo máximo de quince (15) días calendario, directamente sobre el medio de pago utilizado en la compra.

Los costos de transporte para la devolución del producto serán asumidos por el cliente, salvo que la causa de la devolución sea imputable a Nuevo Wevo S.A.S.

El derecho de retracto **no aplica** en los siguientes casos:

- Productos ensamblados o configurados bajo especificaciones expresamente definidas por el cliente al momento de la compra.
- Licencias de software, antivirus y productos digitales activados.
- Productos Outlet y Refurbished, cuyas condiciones son informadas y aceptadas explícitamente antes de la compra.
- Productos en promoción identificados como no retornables en sus términos específicos.

### Cambios y devoluciones por garantía

Nuevo Wevo S.A.S. acepta cambios y devoluciones cuando el producto presente defectos de fábrica, fallas funcionales o no corresponda a las características descritas al momento de la compra. El cliente deberá reportar el inconveniente dentro de los primeros treinta (30) días calendario siguientes a la entrega a través de nuestros canales de atención. Nuevo Wevo S.A.S. responderá a toda reclamación en un plazo máximo de quince (15) días hábiles.

**Recepción de garantías:** Cra. 67 #43-35, Bogotá, Cundinamarca.

### Canal presencial

En tienda física no aplica el derecho de retracto por ley al ser una compra presencial. Nuevo Wevo S.A.S. podrá aceptar cambios a su discreción cuando el producto presente defectos de fábrica debidamente verificados por el equipo técnico.

## Códigos Promocionales

Nuevo Wevo S.A.S. realiza promociones periódicas que pueden incluir descuentos por categoría, marca o producto específico, descuentos asociados a medios de pago particulares, y códigos promocionales otorgados por fabricantes aliados.

Las condiciones de cada promoción —incluyendo productos aplicables, porcentaje de descuento, medio de pago requerido, fechas de vigencia y restricciones— serán informadas claramente al momento de su publicación y harán parte de los términos específicos de cada campaña.

Las promociones no son acumulables entre sí salvo que se indique expresamente lo contrario. Nuevo Wevo S.A.S. se reserva el derecho de modificar, suspender o cancelar cualquier promoción en cualquier momento, sin que ello genere derecho a compensación alguna a favor del cliente.

## Servicios Adicionales

Nuevo Wevo S.A.S. ofrece servicios post-venta que incluyen soporte técnico, mantenimiento preventivo y correctivo, y asesoría especializada. Estos servicios podrán ser contratados de forma independiente a la compra del producto y sus condiciones específicas —incluyendo alcance, tiempos y tarifas— serán acordadas con el cliente al momento de la contratación.

Adicionalmente, los productos adquiridos en Nuevo Wevo S.A.S. pueden estar amparados por garantía directa del fabricante, la cual se rige por las condiciones establecidas por cada marca. Nuevo Wevo S.A.S. actuará como intermediario en los procesos de garantía con fabricantes cuando así se requiera.

## Otros Documentos

Los presentes Términos y Condiciones Generales constituyen el marco legal principal que rige la relación entre Nuevo Wevo S.A.S. y sus clientes. No obstante, podrán coexistir con documentos complementarios tales como términos específicos de promociones, acuerdos de servicio técnico, y condiciones particulares para clientes corporativos, los cuales complementarán estos términos generales sin contradecirlos.

En caso de conflicto entre los presentes términos generales y cualquier documento complementario, prevalecerán las condiciones del documento específico para ese caso particular, siempre que haya sido acordado por escrito entre las partes.

## Legislación Aplicable y Jurisdicción

Los presentes Términos y Condiciones se rigen e interpretan de conformidad con las leyes de la República de Colombia, incluyendo pero sin limitarse a la Ley 1480 de 2011 (Estatuto del Consumidor) y sus modificaciones, la Ley 1581 de 2012 (Protección de Datos Personales) y el Código de Comercio colombiano.

Ante cualquier controversia derivada de estos términos, las partes se comprometen a buscar en primera instancia una solución directa a través de los canales de atención de Nuevo Wevo S.A.S. Si no se llegare a un acuerdo, el consumidor podrá acudir a los mecanismos de protección al consumidor disponibles ante la Superintendencia de Industria y Comercio (SIC).

En caso de que la controversia no pueda resolverse por los medios anteriores, las partes se someten a la jurisdicción de los jueces competentes de la ciudad de Bogotá, Colombia, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.

## Independencia de Disposiciones

Si alguna de las disposiciones contenidas en los presentes Términos y Condiciones fuera declarada nula, ilegal o inaplicable por autoridad competente, dicha declaración no afectará la validez ni la vigencia del resto del documento. Las disposiciones restantes continuarán en pleno vigor y efecto, y las partes acuerdan reemplazar la disposición afectada por una que refleje lo más fielmente posible la intención original, dentro del marco legal aplicable.

## Políticas de Privacidad

Nuevo Wevo S.A.S. implementa medidas técnicas y organizativas para proteger la información personal de sus clientes contra accesos no autorizados, pérdida, alteración o divulgación indebida. Entre estas medidas se incluyen:

- Cifrado SSL en todas las comunicaciones del sitio web www.nuevowevo.com.
- Alojamiento de datos en servidores certificados bajo estándares internacionales de seguridad.
- Implementación del estándar PCI-DSS para el procesamiento seguro de información de pagos con tarjeta.
- Acceso restringido a los datos personales, limitado únicamente al personal autorizado de Nuevo Wevo S.A.S.

### Conservación y eliminación de datos

Nuevo Wevo S.A.S. conservará los datos personales de sus clientes durante el tiempo necesario para cumplir con las finalidades descritas en estos términos y con las obligaciones legales aplicables. Cuando un cliente solicite la eliminación de sus datos, Nuevo Wevo S.A.S. procederá a su supresión en un plazo máximo de quince (15) días hábiles, salvo que exista obligación legal de conservarlos.

Para solicitar la eliminación de sus datos personales, el cliente puede escribir a [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com) indicando su solicitud, o consultar nuestra página de [Eliminación de Datos](/legal/eliminacion-datos).

## Cookies

El sitio web www.nuevowevo.com utiliza cookies y tecnologías similares de seguimiento para mejorar la experiencia de navegación, analizar el tráfico del sitio y optimizar nuestras comunicaciones y campañas de marketing. Las cookies que utilizamos se clasifican en:

- **Cookies esenciales:** necesarias para el funcionamiento básico del sitio, incluyendo la gestión de sesión, carrito de compras y preferencias del usuario. No pueden desactivarse.
- **Cookies analíticas:** nos permiten entender cómo los usuarios interactúan con el sitio. La información recopilada es agregada y anónima.
- **Cookies de marketing:** utilizadas por plataformas como Meta (Facebook), TikTok, Google y otras, para mostrar publicidad relevante y medir la efectividad de nuestras campañas.

El usuario puede en cualquier momento modificar sus preferencias de cookies a través de la configuración de su navegador. La desactivación de cookies no esenciales puede afectar algunas funcionalidades de personalización del sitio.

## Impedimento de Uso

Nuevo Wevo S.A.S. se reserva el derecho de suspender, restringir o cancelar el acceso de un usuario al sitio web y sus servicios, en los siguientes casos:

- Uso fraudulento o indebido del sitio o de los medios de pago disponibles.
- Suplantación de identidad o suministro de información falsa.
- Comportamientos que afecten la disponibilidad de productos para otros usuarios.
- Incumplimiento de los presentes Términos y Condiciones.
- Orden o requerimiento de autoridad competente.

En casos de suspensión por razones de seguridad o fraude, Nuevo Wevo S.A.S. podrá actuar de forma inmediata y sin previo aviso. En los demás casos, se procurará notificar al usuario antes de tomar la medida.

## Responsabilidad del Usuario

Al utilizar el sitio web y los canales de atención de Nuevo Wevo S.A.S., el usuario se compromete a:

- Suministrar información personal veraz, completa y actualizada al momento del registro y durante cualquier transacción.
- Mantener la confidencialidad de sus credenciales de acceso y notificar de inmediato a Nuevo Wevo S.A.S. ante cualquier uso no autorizado de su cuenta.
- Notificar oportunamente a su entidad financiera en caso de pérdida, robo o uso indebido de sus instrumentos de pago.
- No utilizar herramientas automatizadas, bots o cualquier mecanismo que interfiera con el funcionamiento normal del sitio.
- No publicar, transmitir ni compartir a través de los canales de Nuevo Wevo contenido ilegal, difamatorio, fraudulento, violento o que vulnere derechos de terceros.
- Hacer un uso responsable de los canales de atención al cliente.

El usuario será responsable de los daños y perjuicios que cause a Nuevo Wevo S.A.S. o a terceros como consecuencia del incumplimiento de cualquiera de las obligaciones anteriores.

## Información Recopilada

Como parte de la relación comercial, Nuevo Wevo S.A.S. puede recopilar los siguientes tipos de información personal:

- **Información de contacto:** nombre completo, dirección, teléfono y correo electrónico.
- **Información de compra:** historial de pedidos, facturación y datos de envío.
- **Información de navegación:** páginas visitadas, productos consultados, tiempo de sesión y preferencias, recopilada a través de cookies y herramientas analíticas.
- **Información demográfica:** cuando el usuario la suministra voluntariamente.

Esta información se utiliza exclusivamente para procesar y gestionar pedidos, brindar atención al cliente, mejorar la experiencia de navegación, enviar comunicaciones comerciales autorizadas, y cumplir con obligaciones legales, tributarias y contables.

Nuevo Wevo S.A.S. no vende ni arrienda información personal a terceros con fines comerciales propios de dichos terceros. Para cualquier consulta sobre el tratamiento de sus datos personales puede escribirnos a [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com).

## Información para Pagos

El procesamiento de pagos en www.nuevowevo.com se realiza a través de pasarelas de pago certificadas como Mercado Pago y otras plataformas autorizadas. En los casos en que el proceso de pago redirija al usuario a la plataforma de la pasarela o entidad financiera correspondiente, el manejo de la información financiera será responsabilidad exclusiva de dicha entidad, según sus propias políticas de privacidad y seguridad.

Nuevo Wevo S.A.S. no almacena datos de tarjetas de crédito o débito en sus servidores. Toda la información financiera sensible es procesada directamente por las pasarelas de pago certificadas bajo estándar PCI-DSS.

En caso de transacciones fraudulentas o no reconocidas, el usuario deberá notificar de inmediato a su entidad financiera y a Nuevo Wevo S.A.S. a través de [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com) para iniciar el proceso de reversión según lo establecido en la Ley 1480 de 2011 y la Ley 2439 de 2024.

## Reversiones

En los casos en que proceda una devolución de dinero —ya sea por ejercicio del derecho de retracto, producto no disponible, cancelación de pedido o falla imputable a Nuevo Wevo S.A.S.— el reembolso se realizará a través del mismo medio de pago utilizado en la compra original, salvo acuerdo diferente entre las partes.

Los plazos para efectuar el reembolso son los siguientes:

- **Compras por e-commerce:** máximo quince (15) días calendario desde que se confirme la procedencia de la devolución, de conformidad con la Ley 2439 de 2024.
- **Compras en tienda física:** el plazo será acordado con el cliente según el medio de pago utilizado.

Nuevo Wevo S.A.S. no realizará reembolsos en efectivo por compras realizadas con tarjeta de crédito, débito u otros medios de pago electrónicos, salvo en casos excepcionales debidamente justificados y autorizados por gerencia.

## Exoneración de Responsabilidad

Nuevo Wevo S.A.S. no asumirá responsabilidad en los siguientes casos:

- Cuando el usuario no haya notificado oportunamente a su entidad financiera la pérdida, robo o uso indebido de sus instrumentos de pago.
- Cuando el usuario haya compartido sus credenciales de acceso o datos de pago con terceros.
- Cuando los daños sean causados por fuerza mayor, caso fortuito, fallas en servicios de terceros o ataques informáticos externos.
- Cuando el usuario haya suministrado información incorrecta o incompleta al momento de realizar su compra, incluyendo dirección de entrega errónea.
- Cuando los daños sean consecuencia del uso indebido de los productos adquiridos.
- Cuando el usuario no haya ejercido oportunamente sus derechos dentro de los plazos establecidos en estos términos y en la ley.

Lo anterior sin perjuicio de los derechos irrenunciables que le asisten al consumidor en virtud de la Ley 1480 de 2011 y sus modificaciones.

## Elecciones de Acuerdo a su Información Personal

Nuevo Wevo S.A.S. se comunica con sus clientes a través de los siguientes canales:

- **Correo electrónico:** envío de confirmaciones de pedido, actualizaciones de envío y newsletter comercial. El cliente puede cancelar su suscripción en cualquier momento a través del enlace de desuscripción incluido en cada correo.
- **WhatsApp:** atención al cliente y comunicaciones directas relacionadas con pedidos activos.
- **Redes sociales:** comunicaciones y publicidad a través de Meta (Facebook, Instagram) y otras plataformas, sujetas a las políticas de cada plataforma.

Para solicitar la exclusión de comunicaciones directas controladas por Nuevo Wevo S.A.S., el cliente puede escribir a [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com) o comunicarse por WhatsApp al **316 3713928**.

## Contáctenos

Para cualquier consulta, reclamación o solicitud relacionada con nuestros productos, servicios o estos Términos y Condiciones, puede contactarnos a través de los siguientes canales:

- **Punto de venta físico:** Cra. 67 #43-35, Bogotá, Cundinamarca
- **Recepción de garantías:** Cra. 67 #43-35, Bogotá, Cundinamarca
- **Celular / WhatsApp:** 316 3713928
- **Correo electrónico:** [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com)
- **Sitio web:** [www.nuevowevo.com](https://www.nuevowevo.com)

Nuevo Wevo S.A.S. se compromete a responder todas las solicitudes en un plazo máximo de quince (15) días hábiles, de conformidad con la Ley 1480 de 2011.

© 2026 Nuevo Wevo S.A.S. ® Todos los Derechos Reservados — www.nuevowevo.com`,
  },

  'politica-privacidad': {
    title: 'Política de Privacidad',
    updatedLabel: '24 de junio de 2026',
    contentMarkdown: `Nuevo Wevo S.A.S. ("Nuevo Wevo", "nosotros", "nuestro") opera el sitio web www.nuevowevo.com y aplicaciones relacionadas que se integran con plataformas de Meta (Facebook e Instagram). Esta política explica qué información recopilamos a través de dichas aplicaciones, cómo la usamos y los derechos que tienes sobre ella, en cumplimiento de la Ley 1581 de 2012 de Protección de Datos Personales de Colombia.

Esta política complementa nuestra política general de tratamiento de datos personales disponible en [www.nuevowevo.com/legal/datos-personales](/legal/datos-personales).

## 1. Información que Recopilamos

Cuando interactúas con nuestros servicios o autorizas nuestra aplicación conectada a Facebook/Instagram, podemos recopilar:

- Información de tu perfil público de Facebook (nombre, foto, ID de usuario) cuando inicias sesión o conectas tu cuenta.
- Información de las Páginas de Facebook e Instagram que administras y que eliges conectar con nuestra aplicación.
- Tokens de acceso emitidos por Meta para operar en tu nombre.
- Métricas públicas de publicaciones y campañas publicitarias de las cuentas que autorizas.
- Datos de contacto que nos proporciones voluntariamente (correo, teléfono, nombre).

## 2. Cómo Usamos tu Información

Usamos la información recopilada para:

- Publicar contenido en las Páginas y cuentas de Nuevo Wevo.
- Generar y gestionar campañas publicitarias en Meta.
- Analizar el rendimiento de publicaciones y anuncios para optimizar nuestra comunicación con clientes y prospectos.
- Atender cotizaciones, pedidos, garantías y consultas derivadas de estos canales.
- Cumplir obligaciones legales, contables y tributarias en Colombia.

## 3. Cómo Compartimos tu Información

No vendemos tu información personal. Compartimos datos únicamente con:

- **Meta Platforms, Inc.**, para ejecutar las acciones autorizadas (publicar, crear anuncios, leer métricas) en Facebook e Instagram.
- **Proveedores de inteligencia artificial**, que pueden procesar texto para generar contenido publicitario y editorial. No enviamos información personal identificable salvo que sea estrictamente necesario para la tarea solicitada.
- **Proveedores logísticos y pasarelas de pago**, cuando aplique para completar tus compras.
- **Autoridades competentes** cuando sea legalmente requerido.

## 4. Almacenamiento y Seguridad

Guardamos tokens de acceso y datos estrictamente necesarios para operar el servicio. Aplicamos medidas razonables de seguridad técnica y organizativa para proteger tu información conforme a la Ley 1581 de 2012, incluyendo cifrado SSL en todas las comunicaciones del sitio y acceso restringido a los datos únicamente al personal autorizado.

## 5. Tus Derechos

De acuerdo con la normativa colombiana vigente, tienes derecho a:

- Conocer, actualizar y rectificar tus datos personales.
- Solicitar prueba de la autorización otorgada.
- Ser informado sobre el uso dado a tus datos.
- Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).
- Revocar la autorización y solicitar la supresión de tus datos.
- Acceder gratuitamente a tus datos personales.

Para ejercer estos derechos, escríbenos a [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com). Consulta también nuestra página de [eliminación de datos](/legal/eliminacion-datos).

Puedes revocar los permisos de nuestra aplicación en cualquier momento desde:

- **Facebook:** Configuración → Aplicaciones y sitios web.
- **Instagram:** Configuración → Aplicaciones y sitios web.

## 6. Retención de Datos

Conservamos tu información únicamente el tiempo necesario para cumplir los fines descritos, o el tiempo que exija la ley colombiana. Cuando revoques el acceso o solicites la eliminación, borraremos tus datos en un plazo máximo de 30 días, salvo obligación legal de conservación.

## 7. Menores de Edad

Nuestros servicios no están dirigidos a menores de 14 años. No recopilamos conscientemente datos de menores sin autorización de sus representantes legales. Si eres padre o tutor y crees que tu hijo nos ha proporcionado información personal, contáctanos para eliminarla.

## 8. Cambios a Esta Política

Podemos actualizar esta política periódicamente. Publicaremos la versión vigente en esta misma URL con la fecha de actualización. Te recomendamos revisarla con regularidad.

## 9. Contacto

- **Responsable del tratamiento:** Nuevo Wevo S.A.S.
- **Domicilio:** Bogotá D.C., Colombia
- **Dirección:** Cra. 67 #43-35, Bogotá, Cundinamarca
- **Correo:** [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com)
- **Celular / WhatsApp:** 316 3713928
- **Sitio web:** [www.nuevowevo.com](https://www.nuevowevo.com)`,
  },

  'datos-personales': {
    title: 'Políticas de Tratamiento para la Protección de Datos Personales',
    updatedLabel: 'Versión 2.0 — Junio 2026',
    contentMarkdown: `## 1. Introducción

En cumplimiento de lo dispuesto en la Ley 1581 de 2012, la Ley 2439 de 2024 y sus disposiciones reglamentarias, Nuevo Wevo S.A.S., en su calidad de responsable del tratamiento de la información que reposa en sus bases de datos, adopta las siguientes políticas encaminadas a garantizar la protección de los datos personales de sus titulares.

La presente política aplica a todos los datos personales registrados en las bases de datos de Nuevo Wevo S.A.S., incluyendo clientes, usuarios del sitio web, proveedores, empleados y cualquier persona cuya información sea tratada por la empresa en el ejercicio de su actividad comercial.

## 2. Principios

El tratamiento de las bases de datos de Nuevo Wevo S.A.S. atenderá los principios consagrados en el artículo 4 de la Ley 1581 de 2012:

- **Legalidad:** el tratamiento es una actividad reglada que debe sujetarse a lo establecido en la Ley y demás disposiciones que la desarrollen.
- **Finalidad:** el tratamiento obedece a una finalidad legítima de acuerdo con la Constitución y la Ley, la cual será informada al titular en todos los casos.
- **Libertad:** el tratamiento solo será ejercido con el consentimiento previo, expreso e informado del titular. Los datos no podrán obtenerse ni divulgarse sin autorización o mandato legal.
- **Veracidad o calidad:** la información debe ser veraz, completa, exacta, actualizada, comprobable y comprensible. Se prohíbe el tratamiento de datos parciales o que induzcan a error.
- **Transparencia:** se garantizará al titular el derecho a obtener información sobre la existencia de datos que le conciernan, en cualquier momento y sin restricciones.
- **Acceso y circulación restringida:** el tratamiento solo podrá realizarse por personas autorizadas por el titular o por mandato legal.
- **Seguridad:** la información se manejará con las medidas técnicas, humanas y administrativas necesarias para evitar su adulteración, pérdida, uso o acceso no autorizado.
- **Confidencialidad:** todas las personas que intervengan en el tratamiento están obligadas a garantizar la reserva de la información, incluso después de finalizada su vinculación con la empresa.

## 3. Derechos de los Titulares

De conformidad con el artículo 8 de la Ley 1581 de 2012, el titular de los datos personales tendrá los siguientes derechos:

- Conocer, actualizar y rectificar sus datos personales frente a los responsables o encargados del tratamiento.
- Solicitar prueba de la autorización otorgada al responsable del tratamiento.
- Ser informado sobre el uso que se ha dado a sus datos personales.
- Presentar ante la Superintendencia de Industria y Comercio (SIC) quejas por infracciones a lo dispuesto en la Ley.
- Revocar la autorización o solicitar la supresión de sus datos cuando no se respeten los principios, derechos y garantías constitucionales y legales.
- Acceder en forma gratuita a sus datos personales que hayan sido objeto de tratamiento.

Para ejercer cualquiera de estos derechos, el titular deberá dirigirse a [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com). Nuevo Wevo S.A.S. dará respuesta en un plazo máximo de quince (15) días hábiles, de conformidad con la Ley 2439 de 2024.

## 4. Deberes de Nuevo Wevo S.A.S.

En relación con el tratamiento de datos personales, Nuevo Wevo S.A.S. se obliga a:

- Garantizar al titular el pleno y efectivo ejercicio del derecho de habeas data.
- Solicitar y conservar copia de la autorización otorgada por el titular.
- Informar debidamente al titular sobre la finalidad de la recolección y los derechos que le asisten.
- Conservar la información bajo condiciones de seguridad necesarias para impedir su adulteración, pérdida, uso o acceso no autorizado.
- Actualizar la información cuando sea necesario y adoptar las medidas para mantenerla vigente.
- Rectificar la información cuando sea incorrecta y comunicar lo pertinente a los encargados del tratamiento.
- Tramitar las consultas y reclamos formulados por los titulares en los términos legales.
- Informar a la SIC cuando se presenten violaciones a los códigos de seguridad o riesgos en la administración de la información.
- Cumplir con las instrucciones y requerimientos que imparta la Superintendencia de Industria y Comercio.

## 5. Autorizaciones

El tratamiento de datos personales por parte de Nuevo Wevo S.A.S. requiere del consentimiento libre, previo, expreso e informado del titular, salvo que los datos sean de naturaleza pública.

La autorización podrá darse por escrito, de forma verbal o mediante conducta inequívoca, a través de medios físicos o electrónicos. En todos los casos, Nuevo Wevo S.A.S. dispondrá de mecanismos para verificar el otorgamiento de dicha autorización.

Para compras realizadas a través del sitio web, la autorización se obtiene mediante el checkbox de aceptación de términos y condiciones dispuesto en el proceso de compra, el cual incluye de forma expresa la autorización para el tratamiento de datos personales.

La autorización incluirá como mínimo: el responsable del tratamiento, los datos que se recopilan, la finalidad del tratamiento, los derechos del titular, y la identificación de terceros a quienes se transferirán los datos.

No será necesaria la autorización del titular cuando se trate de datos de fuentes públicas, datos relativos al estado civil, profesión u oficio, o calidad de comerciante o servidor público.

## 6. Transferencia de Datos a Terceros

En el marco de su operación comercial, Nuevo Wevo S.A.S. transfiere datos personales a terceros que actúan como encargados del tratamiento, exclusivamente para los fines descritos en esta política:

- **Operadores logísticos y transportadoras** (Envia.com, Coordinadora, Servientrega, TCC, Interrapidísimo y otros): nombre, dirección y teléfono para la gestión de envíos y entregas.
- **Pasarelas de pago** (Mercado Pago y otras): datos necesarios para el procesamiento seguro de transacciones financieras.
- **Fabricantes y distribuidores autorizados** (Nvidia, LG, Asus, Gigabyte, MSI, Kingston y otros): datos de ventas para fines estadísticos y de gestión de garantías.
- **Marketplaces** (MercadoLibre, Falabella, Rappi, Addi Marketplace y otros): datos necesarios para la gestión de órdenes en dichas plataformas.

Todos los terceros que reciben datos están contractualmente obligados a tratarlos únicamente para los fines autorizados y a cumplir con la normativa colombiana de protección de datos. Nuevo Wevo S.A.S. no vende ni arrienda información personal a terceros con fines comerciales propios de dichos terceros.

## 7. Procedimientos para Consultas y Reclamaciones

El área encargada de la atención de peticiones, consultas y reclamos relacionados con datos personales es la Gerencia de Nuevo Wevo S.A.S.

El titular podrá ejercer sus derechos enviando su solicitud por escrito al correo electrónico [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com), incluyendo la siguiente información:

- Nombres y apellidos completos.
- Tipo y número de documento de identidad.
- Teléfono de contacto.
- Correo electrónico.
- Descripción del asunto o derecho que desea ejercer.

Nuevo Wevo S.A.S. dará respuesta en un plazo máximo de quince (15) días hábiles contados desde la recepción de la solicitud. Si no fuere posible atenderla en dicho término, se informará al titular antes de su vencimiento, indicando los motivos de la demora y la fecha de atención, la cual no podrá superar los cinco (5) días hábiles adicionales.

Los derechos podrán ejercerse por el titular, sus causahabientes, su representante o apoderado debidamente acreditado, o mediante estipulación a favor de otro.

## 8. Tratamiento, Finalidad y Vigencia de las Bases de Datos

Las bases de datos sujetas a tratamiento por parte de Nuevo Wevo S.A.S. son: Clientes, Usuarios del sitio web, Proveedores y aliados comerciales, Empleados y colaboradores, y Vinculaciones comerciales.

Los datos personales serán utilizados exclusivamente para las siguientes finalidades:

- Procesar y gestionar pedidos, pagos y entregas.
- Brindar atención al cliente y dar seguimiento a garantías y reclamaciones.
- Enviar comunicaciones comerciales, promociones y novedades a usuarios que hayan dado su consentimiento.
- Mejorar la experiencia de navegación y personalizar los servicios ofrecidos.
- Cumplir con obligaciones legales, tributarias y contables.
- Generar reportes estadísticos de ventas para fabricantes aliados.
- Evaluar la calidad de los productos y servicios ofrecidos.

Los datos serán conservados durante el tiempo necesario para cumplir con las finalidades descritas y con las obligaciones legales aplicables. Cuando un titular solicite la supresión de sus datos, Nuevo Wevo S.A.S. procederá a eliminarlos en un plazo máximo de quince (15) días hábiles, salvo que exista obligación legal de conservarlos.

## 9. Modificaciones y Actualizaciones

Nuevo Wevo S.A.S. se reserva el derecho de modificar la presente política en cualquier momento para adaptarla a cambios normativos, operativos o comerciales.

Cualquier cambio sustancial será comunicado a los titulares de forma previa y oportuna a través del sitio web www.nuevowevo.com y mediante correo electrónico a los usuarios registrados.

Cuando el cambio se refiera a la finalidad del tratamiento, se obtendrá una nueva autorización por parte del titular antes de proceder con el nuevo tratamiento.

## 10. Datos de Contacto del Responsable del Tratamiento

- **Razón social:** Nuevo Wevo S.A.S.
- **Domicilio:** Cra. 67 #43-35, Bogotá, Cundinamarca
- **Correo electrónico:** [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com)
- **Celular / WhatsApp:** 316 3713928
- **Sitio web:** [www.nuevowevo.com](https://www.nuevowevo.com)`,
  },

  'eliminacion-datos': {
    title: 'Instrucciones para Eliminación de Datos',
    updatedLabel: '24 de junio de 2026',
    contentMarkdown: `En Nuevo Wevo S.A.S. respetamos tu derecho a eliminar la información que hayamos recopilado a través de nuestra aplicación conectada a Facebook e Instagram, en cumplimiento de la Ley 1581 de 2012 de Protección de Datos Personales de Colombia.

## Cómo Solicitar la Eliminación de tus Datos

Tienes dos opciones:

### Opción 1 — Revocar el acceso directamente en Facebook

1. Abre Facebook e ingresa a **Configuración y privacidad**.
2. Selecciona **Configuración → Aplicaciones y sitios web**.
3. Busca **"Nuevo Wevo"** en la lista.
4. Haz clic en **Eliminar**.

Al revocar el acceso, recibiremos automáticamente la notificación de Meta y eliminaremos los datos asociados a tu cuenta en un plazo máximo de 30 días.

### Opción 2 — Solicitud directa por correo

Envíanos un correo a [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com) con el asunto **"Eliminación de datos"** e incluye:

- Tu nombre completo.
- Tipo y número de documento.
- El correo o ID de usuario de Facebook asociado.
- Confirmación de que deseas eliminar tus datos.

Responderemos en un máximo de 10 días hábiles y completaremos la eliminación en un plazo máximo de 30 días desde la recepción de la solicitud.

## Qué Datos se Eliminan

- Tokens de acceso almacenados.
- Información de perfil recopilada por nuestra aplicación.
- Registros de publicaciones o campañas procesadas por nuestra aplicación.
- Cualquier dato personal vinculado a tu cuenta dentro de nuestros sistemas de marketing digital.

## Qué NO Podemos Eliminar

- Datos que ya hayan sido publicados por ti o por tu autorización en Facebook/Instagram (esos debes eliminarlos desde las propias plataformas).
- Registros que debamos conservar por obligación legal, contable o tributaria en Colombia (facturación, garantías, entre otros), conforme al Estatuto Tributario y al Código de Comercio.
- Información asociada a compras realizadas, la cual se conserva conforme a la ley.

## Contacto

- **Responsable del tratamiento:** Nuevo Wevo S.A.S.
- **Domicilio:** Bogotá D.C., Colombia
- **Dirección:** Cra. 67 #43-35, Bogotá, Cundinamarca
- **Correo:** [ventas@nuevowevo.com](mailto:ventas@nuevowevo.com)
- **Celular / WhatsApp:** 316 3713928
- **Sitio web:** [www.nuevowevo.com](https://www.nuevowevo.com)`,
  },
};
