import { NextResponse } from 'next/server';

export async function POST(request) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const { rubro, zona, filename, username, password, authCheck } = body;

    // 🔒 Validación de Seguridad
    if (username !== "Rodrigoloh" || password !== process.env.SCRAPER_PASSWORD) {
      return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
    }

    if (authCheck) {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    }

    const query = `${rubro} en ${zona}`;
    const apiKey = process.env.SERPAPI_KEY;
    
    const searchUrl = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(query)}&api_key=${apiKey}`;
    const res = await fetch(searchUrl);
    const data = await res.json();
    
    // 🗺️ 1. Guardamos el link global donde se agrupan todos los resultados
    const mapaGlobalUrl = data.search_metadata?.google_maps_url || `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

    const places = data.local_results || [];

    // 📄 Encabezado del CSV
    let csvContent = "\uFEFFNombre,Sitio Web,Telefono,Direccion,Prioridad,Link de Google Maps del Comercio\n";
    
    // 2. Insertamos cada comercio fila por fila
    places.forEach(p => {
      const web = p.website || "No tiene";
      const prioridad = web === "No tiene" ? "ALTA (Crear Web)" : "Media (Actualizar)";
      
      const cleanTitle = (p.title || '').replace(/"/g, '""');
      const cleanAddress = (p.address || '').replace(/"/g, '""');
      const negocioMapsUrl = p.link || `https://www.google.com/maps/search/${encodeURIComponent(p.title + ' ' + (p.address || ''))}`;
      
      csvContent += `"${cleanTitle}","${web}","${p.phone || 'N/A'}","${cleanAddress}","${prioridad}","${negocioMapsUrl}"\n`;
    });

    // ➕ 3. AGREGAMOS LAS FILAS FINALES DE AGRUPACIÓN
    // Dejamos una fila completamente en blanco para que visualmente se vea ordenado en Excel/Google Sheets
    csvContent += "\n";
    // Insertamos la fila con el enlace global del mapa completo
    csvContent += `"MAPA COMPLETO DE LA BÚSQUEDA (Todos los resultados agrupados)","","","","","${mapaGlobalUrl}"\n`;

    const endTime = Date.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(2);

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename=${filename || 'matriz'}.csv`,
        'X-Render-Time': `${totalTime}s` 
      }
    });

  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}