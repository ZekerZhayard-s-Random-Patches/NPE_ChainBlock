
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var FieldInsnNode = Java.type("org.objectweb.asm.tree.FieldInsnNode");
var JumpInsnNode = Java.type("org.objectweb.asm.tree.JumpInsnNode");
var VarInsnNode = Java.type("org.objectweb.asm.tree.VarInsnNode");

function initializeCoreMod() {
    return {
        "LivingEntity_<init>": {
            "target": {
                "type": "METHOD",
                "class": "twilightforest/entity/ChainBlock",
                "methodName": "m_8060_",
                "methodDesc": "(Lnet/minecraft/world/phys/BlockHitResult;)V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.GETFIELD && node.owner.equals("twilightforest/entity/ChainBlock") && node.name.equals("stack") && node.desc.equals("Lnet/minecraft/world/item/ItemStack;")) {
                        for (var j = i; j < insnList.length; j++) {
                            var node0 = insnList[j];
                            if (node0.getOpcode() === Opcodes.IFNE) {
                                mn.instructions.insertBefore(node, new FieldInsnNode(Opcodes.GETFIELD, "twilightforest/entity/ChainBlock", "stack", "Lnet/minecraft/world/item/ItemStack;"));
                                mn.instructions.insertBefore(node, new JumpInsnNode(Opcodes.IFNULL, node0.label));
                                mn.instructions.insertBefore(node, new VarInsnNode(Opcodes.ALOAD, 0));
                                break;
                            }
                        }
                        break;
                    }
                }
                return mn;
            }
        }
    }
}
