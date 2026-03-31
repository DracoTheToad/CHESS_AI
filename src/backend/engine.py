import chess
import random

def get_best_move(fen):
    """
    INPUT:
        fen (str): Chuỗi FEN mô tả trạng thái bàn cờ hiện tại
                   Ví dụ:
                   "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

    OUTPUT:
        str: nước đi ở dạng UCI (Universal Chess Interface)
             ví dụ: "e2e4", "g1f3", ...
        hoặc:
        None: nếu không còn nước đi hợp lệ (checkmate / stalemate)
    """

    # Tạo bàn cờ từ FEN
    board = chess.Board(fen)

    # Lấy danh sách tất cả nước đi hợp lệ
    moves = list(board.legal_moves)

    # Nếu không còn nước đi → kết thúc ván
    if not moves:
        return None

    # Chọn ngẫu nhiên 1 nước đi
    move = random.choice(moves)

    # Trả về dạng UCI (ví dụ: e2e4)
    return move.uci()
