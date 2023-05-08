AFRAME.registerComponent('walk', {
    init: function () {
        var gameStateValue = this.el.getAttribute("game")
        if (gameStateValue == "play") {
            this.walk()
        }
    },
    isVelocityActive: function () {
        console.log("hi")
        return Math.random() < 0.20;
    },

    driveCar: function () {
        var multiply = 10;
        var turning = 0;

        window.addEventListener('keydown', function (e) {

            var turn = document.querySelector("#control-direction")

            if (e.code == "ArrowRight" && turning > -40) {                
                turning -= 7
                turn.setAttribute("rotation", { x: 0, y: 0, z: turning })

            }
            if (e.code == "ArrowLeft" && wheelRotation < 40) {                
                turning += 7
                turn.setAttribute("rotation", { x: 0, y: 0, z: turning })
            }
            
            var cameraRig = document.querySelector("#camera-rig")
            var cameraRotation = cameraRig.getAttribute("rotation")
            var cameraPosition = cameraRig.getAttribute("position")
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            console.log(cameraMoveControl.speed)
            cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
            console.log(cameraMoveControl.speed)

            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);

            if (e.code == "ArrowRight") {
                cameraRotation.y -= 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })                
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})

            }

            if (e.code == "ArrowLeft") {
                cameraRotation.y += 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })             
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})

            }

            if (e.code == "Space") {            
                cameraRig.setAttribute("movement-controls", {"speed": 0})
                var stop = document.querySelector("#control-break")
                stop.setAttribute("material", "color", "black")
            }

        })

        window.addEventListener('keyup', function (e) {
            var cameraRig = document.querySelector("#camera-rig")
            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            if (e.code == "Space") {             
                var start = document.querySelector("#control-break")
                start.setAttribute("material", "color", "green")
            }

        })
    }

});