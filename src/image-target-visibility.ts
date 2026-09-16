import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'image-target-visibility',
  // Hier definieren wir, was im 8th Wall Studio rechts als Einstellung auftaucht
  schema: {
    showOnFound: ecs.boolean,
  },
  schemaDefaults: {
    showOnFound: true, // Standardmäßig: Zeigen, wenn gefunden
  },
  add: (world, component) => {
    
    // 1. Initial-Zustand setzen:
    // Wenn das Objekt erst beim Tracken gezeigt werden soll, verstecken wir es am Anfang komplett
    // (ecs.Hidden funktioniert sowohl für 3D-Modelle als auch für UI-Elemente wie Iframes)
    if (component.schema.showOnFound) {
      ecs.Hidden.set(world, component.eid)
    }

    const onImageFound = (e) => {
      // Wenn der Toggle im Studio auf "true" (an) steht:
      if (component.schema.showOnFound) {
        // Zeige das Objekt (wir entfernen die Hidden-Komponente)
        ecs.Hidden.remove(world, component.eid)
      } else {
        // Toggle ist "false" (aus): Verstecke das Objekt, wenn das Bild erkannt wird
        ecs.Hidden.set(world, component.eid)
      }
    }

    const onImageLost = (e) => {
      if (component.schema.showOnFound) {
        // Bild verloren -> Objekt wieder verstecken
        ecs.Hidden.set(world, component.eid)
      } else {
        // Bild verloren -> Objekt wieder anzeigen
        ecs.Hidden.remove(world, component.eid)
      }
    }

    // Events abonnieren
    world.events.addListener(world.events.globalId, 'reality.imagefound', onImageFound)
    world.events.addListener(world.events.globalId, 'reality.imagelost', onImageLost)
  },
})
