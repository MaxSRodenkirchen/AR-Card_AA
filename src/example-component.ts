import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'example-component',
  add: (world, component) => {
    console.log('Component attached.')

    // Wird aufgerufen, wenn das Bild erkannt wird
    const onImageFound = (e) => {
      console.log('Bild gefunden! Name des Targets:', e.data.name)

      // Spiele Sound ab (prüft ob eine Audio-Komponente auf demselben Objekt existiert)
      if (ecs.Audio.has(world, component.eid)) {
        const audio = ecs.Audio.cursor(world, component.eid)
        // audio.autoPlay = true
        audio.paused = false
      }
    }

    // Wird aufgerufen, wenn das Bild nicht mehr getrackt wird
    const onImageLost = (e) => {
      console.log('Bild verloren! Name des Targets:', e.data.name)

      // Pausiere Sound wieder
      if (ecs.Audio.has(world, component.eid)) {
        const audio = ecs.Audio.cursor(world, component.eid)
        audio.paused = true
      }
    }

    // Registriere die globalen Event-Listener für Image Tracking
    world.events.addListener(world.events.globalId, 'reality.imagefound', onImageFound)
    world.events.addListener(world.events.globalId, 'reality.imagelost', onImageLost)
  },
})
